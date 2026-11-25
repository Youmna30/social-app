"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_1 = __importDefault(require("../../lib/di/container"));
const tokens_1 = require("../../lib/di/tokens");
const authRouter = (0, express_1.Router)();
const authController = container_1.default.resolve(tokens_1.TOKENS.AuthController);
authRouter.post("/register", authController.register);
authRouter.patch("/verify-account", authController.verifyAccount);
authRouter.post("/login", authController.login);
authRouter.post("/google-login", authController.loginWithGoogle);
authRouter.post("/refresh-token", authController.refreshToken);
authRouter.post("/logout", authController.logout);
exports.default = authRouter;
