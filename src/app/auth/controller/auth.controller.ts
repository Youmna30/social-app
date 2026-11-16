import { NextFunction, Request, Response } from "express";
import authService, { AuthService } from "../service/auth.service";
import { loginDTO, registerDTO, verifyAccountDTO } from "../dto/auth.dto";
import { Validator } from "../../../lib/validation/validation";
import { noToken } from "../errors";
class AuthController {
  private authService: AuthService = authService;

  constructor() {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = Validator.validate(registerDTO, req.body);
      const createdUser = await this.authService.register(userData);
      return res.status(201).json({
        message: "User registered successfully",
        success: true,
        data: createdUser,
      });
    } catch (error) {
      next(error);
    }
  };
  verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = Validator.validate(verifyAccountDTO, req.body);
      const { email, code } = data;
      const updatedUser = await this.authService.verifyAccount(email, code);
      res.status(200).json({
        message: "User verified successfully",
        success: true,
        user: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  };
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = Validator.validate(loginDTO, req.body);
      const { email, password } = data;
      const tokens = await this.authService.login(email, password);
      if (!tokens) {
        return res.status(200).json({
          message: "Code sent, please check your email",
          success: true,
        });
      }
      const { accessToken, refreshToken } = tokens;
      res.cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/api/auth/refresh-token",
      });
      res.status(200).json({
        message: " User Login Successfully",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies?.refresh_token;
      if (!refreshToken) {
        throw noToken;
      }
      const accessToken = await this.authService.refreshToken(refreshToken);
      res.cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
      res.status(200).json({
        message: "Token refreshed successfully",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
  loginWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { idToken } = req.body;
      const { accessToken, refreshToken } =
        await this.authService.loginWithGoogle(idToken);
      res.cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/api/auth/refresh-token",
      });
      res.status(200).json({
        message: " User Login Successfully",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("access_token");
      res.clearCookie("refresh_token", { path: "/api/auth/refresh-token" });
      res.status(200).json({
        message: "User logged out successfully",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}
export default new AuthController();
