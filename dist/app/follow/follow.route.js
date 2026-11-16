"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const guard_1 = require("../../lib/auth/guard");
const follow_controller_1 = __importDefault(require("./controller/follow.controller"));
const followRouter = (0, express_1.Router)();
followRouter.post("/follow", guard_1.authGuard, follow_controller_1.default.follow);
followRouter.post("/unfollow", guard_1.authGuard, follow_controller_1.default.unFollow);
exports.default = followRouter;
