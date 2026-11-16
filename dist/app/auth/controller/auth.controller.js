"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../service/auth.service"));
const auth_dto_1 = require("../dto/auth.dto");
const validation_1 = require("../../../lib/validation/validation");
const errors_1 = require("../errors");
class AuthController {
    authService = auth_service_1.default;
    constructor() { }
    register = async (req, res, next) => {
        try {
            const userData = validation_1.Validator.validate(auth_dto_1.registerDTO, req.body);
            const createdUser = await this.authService.register(userData);
            return res.status(201).json({
                message: "User registered successfully",
                success: true,
                data: createdUser,
            });
        }
        catch (error) {
            next(error);
        }
    };
    verifyAccount = async (req, res, next) => {
        try {
            const data = validation_1.Validator.validate(auth_dto_1.verifyAccountDTO, req.body);
            const { email, code } = data;
            const updatedUser = await this.authService.verifyAccount(email, code);
            res.status(200).json({
                message: "User verified successfully",
                success: true,
                user: updatedUser,
            });
        }
        catch (error) {
            next(error);
        }
    };
    login = async (req, res, next) => {
        try {
            const data = validation_1.Validator.validate(auth_dto_1.loginDTO, req.body);
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
        }
        catch (error) {
            next(error);
        }
    };
    refreshToken = async (req, res, next) => {
        try {
            const refreshToken = req.cookies?.refresh_token;
            if (!refreshToken) {
                throw errors_1.noToken;
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
        }
        catch (error) {
            next(error);
        }
    };
    loginWithGoogle = async (req, res, next) => {
        try {
            const { idToken } = req.body;
            const { accessToken, refreshToken } = await this.authService.loginWithGoogle(idToken);
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
        }
        catch (error) {
            next(error);
        }
    };
    logout = async (req, res, next) => {
        try {
            res.clearCookie("access_token");
            res.clearCookie("refresh_token", { path: "/api/auth/refresh-token" });
            res.status(200).json({
                message: "User logged out successfully",
                success: true,
            });
        }
        catch (error) {
            next(error);
        }
    };
}
exports.default = new AuthController();
