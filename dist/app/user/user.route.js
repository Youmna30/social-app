"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./controller/user.controller"));
// import { checkIdempotency } from "../../lib/idempotency/idEmpotency.";
const guard_1 = require("../../lib/auth/guard");
const userRouter = (0, express_1.Router)();
userRouter.get("/get-profile", guard_1.authGuard, user_controller_1.default.getProfile);
userRouter.put("/update-profile", guard_1.authGuard, user_controller_1.default.updateProfile);
userRouter.put("/change-privacy", guard_1.authGuard, user_controller_1.default.changePrivacy);
userRouter.get("/search-users", guard_1.authGuard, user_controller_1.default.searchUsers);
exports.default = userRouter;
