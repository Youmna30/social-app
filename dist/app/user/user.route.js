"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const guard_1 = require("../../lib/auth/guard");
const tokens_1 = require("../../lib/di/tokens");
const container_1 = __importDefault(require("../../lib/di/container"));
const userRouter = (0, express_1.Router)();
const userController = container_1.default.resolve(tokens_1.TOKENS.UserController);
userRouter.get("/get-profile", guard_1.authGuard, userController.getProfile);
userRouter.put("/update-profile", guard_1.authGuard, userController.updateProfile);
userRouter.put("/change-privacy", guard_1.authGuard, userController.changePrivacy);
userRouter.get("/search-users", guard_1.authGuard, userController.searchUsers);
exports.default = userRouter;
