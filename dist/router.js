"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./app/auth/auth.route"));
const user_route_1 = __importDefault(require("./app/user/user.route"));
const follow_route_1 = __importDefault(require("./app/follow/follow.route"));
const post_route_1 = require("./app/post/post.route");
const comment_route_1 = require("./app/comment/comment.route");
exports.router = (0, express_1.Router)();
exports.router.use("/auth", auth_route_1.default);
exports.router.use("/user", user_route_1.default);
exports.router.use("/", follow_route_1.default);
exports.router.use("/post", post_route_1.postRouter);
exports.router.use("/comment", comment_route_1.commentRouter);
