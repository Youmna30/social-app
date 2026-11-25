"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const guard_1 = require("../../lib/auth/guard");
const container_1 = __importDefault(require("../../lib/di/container"));
const tokens_1 = require("../../lib/di/tokens");
const followRouter = (0, express_1.Router)();
const followController = container_1.default.resolve(tokens_1.TOKENS.FollowController);
followRouter.post("/follow", guard_1.authGuard, followController.follow);
followRouter.post("/unfollow", guard_1.authGuard, followController.unFollow);
exports.default = followRouter;
