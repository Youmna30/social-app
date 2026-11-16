"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_repository_1 = __importDefault(require("../../user/repository/user.repository"));
const errors_1 = require("../../user/errors");
const hash_1 = require("../utils/hash");
const otp_1 = require("../../../lib/utils/otp");
const init_1 = require("../../../lib/email/init");
const init_2 = require("../../../lib/cache/init");
const errors_2 = require("../errors");
const token_1 = require("../utils/token");
const google_auth_1 = require("../../../lib/utils/google.auth");
class AuthService {
    userRepository = user_repository_1.default;
    mailProvider;
    constructor() {
        this.mailProvider = init_1.mailjetProvider;
    }
    async register(userData) {
        const userExist = await this.userRepository.findByEmail(userData.email);
        if (userExist)
            throw errors_1.userAlreadyExist;
        userData.password = await (0, hash_1.hashPassword)(userData.password);
        const createdUser = await this.userRepository.create(userData);
        const otpCode = (0, otp_1.generateOtp)();
        await init_2.cacheProvider.set(`register-otp:${userData.email}`, otpCode, 300);
        await this.mailProvider.sendEmail(userData.email, "Verification code", `Your verification code is ${otpCode}`);
        return createdUser;
    }
    async verifyAccount(email, code) {
        const user = await this.userRepository.findByEmail(email);
        if (!user)
            throw errors_1.userNotExist;
        if (user.isVerified === true)
            throw errors_1.userAlreadyVerified;
        const cachedOtp = await init_2.cacheProvider.get(`register-otp:${email}`);
        if (cachedOtp === "0")
            throw errors_2.optExpired;
        if (cachedOtp !== code)
            throw errors_2.invalidCode;
        const updatedUser = await this.userRepository.update({ email: email }, {
            isVerified: true,
        }, { returnDocument: "after" });
        await init_2.cacheProvider.del(`register-otp:${email}`);
        return updatedUser;
    }
    async login(email, password) {
        const incorrectPasswordCache = await init_2.cacheProvider.get(`incorrectPasswordCacheKey:${email}`);
        if (incorrectPasswordCache === "0")
            throw errors_2.blockedLogin;
        const user = await this.userRepository.findByEmail(email);
        if (!user)
            throw errors_1.userNotExist;
        if (user.isVerified === false)
            throw errors_1.userNotVerified;
        const match = await (0, hash_1.comparePassword)(password, user.password);
        if (!match) {
            const ttlRemaining = await init_2.cacheProvider.ttl(`incorrectPasswordCacheKey:${email}`);
            const attempts = Number(incorrectPasswordCache) ?? 5;
            const ttl = ttlRemaining === -2 ? 5 * 60 : ttlRemaining;
            await init_2.cacheProvider.set(`incorrectPasswordCacheKey:${email}`, (attempts - 1).toString(), ttl);
            throw errors_2.incorrectPassword;
        }
        await init_2.cacheProvider.del(`incorrectPasswordCacheKey:${email}`);
        const accessToken = (0, token_1.generateAccessToken)({
            id: user._id,
            email: user.email,
            name: user.username,
        });
        const refreshToken = (0, token_1.generateRefreshToken)({
            id: user._id,
            email: user.email,
            name: user.username,
        });
        return { accessToken, refreshToken };
    }
    async refreshToken(refreshToken) {
        if (!refreshToken) {
            throw errors_2.noToken;
        }
        const user = await (0, token_1.decodeToken)(refreshToken);
        if (!user) {
            throw errors_2.invalidRefreshToken;
        }
        const accessToken = (0, token_1.generateAccessToken)({
            id: user._id,
            email: user.email,
            username: user.username,
        });
        return accessToken;
    }
    async loginWithGoogle(idToken) {
        const payload = await (0, google_auth_1.verifyGoogleToken)(idToken);
        if (payload === undefined)
            throw errors_2.invalidGoogleLogin;
        const user = await this.userRepository.findByEmail(payload.email);
        if (user) {
            const accessToken = (0, token_1.generateAccessToken)({
                id: user._id,
                email: user.email,
                name: user.username,
            });
            const refreshToken = (0, token_1.generateRefreshToken)({
                id: user._id,
                email: user.email,
                name: user.username,
            });
            return { accessToken, refreshToken };
        }
        const createdUser = await this.userRepository.create({
            email: payload.email,
            username: payload.name,
            provider: 1,
            isVerified: true,
        });
        const accessToken = (0, token_1.generateAccessToken)({
            id: createdUser._id,
            email: createdUser.email,
            username: createdUser.username,
        });
        const refreshToken = (0, token_1.generateRefreshToken)({
            id: createdUser._id,
            email: createdUser.email,
            username: createdUser.username,
        });
        return { accessToken, refreshToken };
    }
}
exports.AuthService = AuthService;
exports.default = new AuthService();
