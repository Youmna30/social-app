import { UserRepository } from "../../user/repository/user.repository";
import {
  userAlreadyExist,
  userAlreadyVerified,
  userNotExist,
  userNotVerified,
} from "../../user/errors";
import { IUser } from "../../user/interface/user.interface";
import { comparePassword, hashPassword } from "../utils/hash";
import { generateOtp } from "../../../lib/utils/otp";
import { MailProvider } from "../../../pkg/email/mail.interface";
import {
  blockedLogin,
  incorrectPassword,
  invalidCode,
  invalidGoogleLogin,
  invalidRefreshToken,
  noToken,
  optExpired,
} from "../errors";
import {
  decodeToken,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/token";
import { verifyGoogleToken } from "../../../lib/utils/google.auth";
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../../../lib/di/tokens";
import { ICacheProvider } from "../../../pkg/cache/cache.interface";

@injectable()
export class AuthService {
  constructor(
    @inject(TOKENS.UserRepository)
    private readonly userRepository: UserRepository,
    @inject(TOKENS.MailjetProvider)
    private readonly mailProvider: MailProvider,
    @inject(TOKENS.CacheProvider)
    private readonly cacheProvider: ICacheProvider,
  ) {}
  async register(userData: IUser) {
    const userExist = await this.userRepository.findByEmail(userData.email);
    if (userExist) throw userAlreadyExist;
    userData.password = await hashPassword(userData.password as string);
    const createdUser = await this.userRepository.create(userData);
    const otpCode = generateOtp();
    await this.cacheProvider.set(
      `register-otp:${userData.email}`,
      otpCode,
      300,
    );
    await this.mailProvider.sendEmail(
      userData.email,
      "Verification code",
      `Your verification code is ${otpCode}`,
    );
    return createdUser;
  }
  async verifyAccount(email: string, code: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw userNotExist;
    if (user.isVerified === true) throw userAlreadyVerified;
    const cachedOtp = await this.cacheProvider.get(`register-otp:${email}`);

    if (cachedOtp === "0") throw optExpired;
    if (cachedOtp !== code) throw invalidCode;
    const updatedUser = await this.userRepository.update(
      { email: email },
      {
        isVerified: true,
      },
      { returnDocument: "after" },
    );
    await this.cacheProvider.del(`register-otp:${email}`);
    return updatedUser;
  }
  async login(email: string, password: string) {
    const incorrectPasswordCache = await this.cacheProvider.get(
      `incorrectPasswordCacheKey:${email}`,
    );
    if (incorrectPasswordCache === "0") throw blockedLogin;

    const user = await this.userRepository.findByEmail(email);
    if (!user) throw userNotExist;
    if (user.isVerified === false) throw userNotVerified;
    const match = await comparePassword(password, user.password as string);
    if (!match) {
      const ttlRemaining = await this.cacheProvider.ttl(
        `incorrectPasswordCacheKey:${email}`,
      );
      const attempts: number = Number(incorrectPasswordCache) ?? 5;
      const ttl = ttlRemaining === -2 ? 5 * 60 : ttlRemaining;
      await this.cacheProvider.set(
        `incorrectPasswordCacheKey:${email}`,
        (attempts - 1).toString(),
        ttl,
      );
      throw incorrectPassword;
    }
    await this.cacheProvider.del(`incorrectPasswordCacheKey:${email}`);

    const accessToken = generateAccessToken({
      id: user._id,
      email: user.email,
      name: user.username,
    });
    const refreshToken = generateRefreshToken({
      id: user._id,
      email: user.email,
      name: user.username,
    });

    return { accessToken, refreshToken };
  }
  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw noToken;
    }
    const user = await decodeToken(refreshToken);
    if (!user) {
      throw invalidRefreshToken;
    }
    const accessToken = generateAccessToken({
      id: user._id,
      email: user.email,
      username: user.username,
    });
    return accessToken;
  }
  async loginWithGoogle(idToken: string) {
    const payload = await verifyGoogleToken(idToken);
    if (payload === undefined) throw invalidGoogleLogin;
    const user = await this.userRepository.findByEmail(payload.email as string);
    if (user) {
      const accessToken = generateAccessToken({
        id: user._id,
        email: user.email,
        name: user.username,
      });
      const refreshToken = generateRefreshToken({
        id: user._id,
        email: user.email,
        name: user.username,
      });

      return { accessToken, refreshToken };
    }
    const createdUser = await this.userRepository.create({
      email: payload.email as string,
      username: payload.name as string,
      provider: 1,
      isVerified: true,
    });
    const accessToken = generateAccessToken({
      id: createdUser._id,
      email: createdUser.email,
      username: createdUser.username,
    });
    const refreshToken = generateRefreshToken({
      id: createdUser._id,
      email: createdUser.email,
      username: createdUser.username,
    });

    return { accessToken, refreshToken };
  }
}
