"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./controller/auth.controller"));
// import { checkIdempotency } from "../../lib/idempotency/idEmpotency.";
// import { authGuard } from '../../lib/auth/guard.js';
const authRouter = (0, express_1.Router)();
authRouter.post("/register", auth_controller_1.default.register);
authRouter.patch("/verify-account", auth_controller_1.default.verifyAccount);
authRouter.post("/login", auth_controller_1.default.login);
authRouter.post("/google-login", auth_controller_1.default.loginWithGoogle);
authRouter.post("/refresh-token", auth_controller_1.default.refreshToken);
authRouter.post("/logout", auth_controller_1.default.logout);
exports.default = authRouter;
