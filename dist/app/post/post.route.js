"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const guard_1 = require("../../lib/auth/guard");
const post_controller_1 = __importDefault(require("./controller/post.controller"));
exports.postRouter = (0, express_1.Router)();
exports.postRouter.get("/get-post/:id", guard_1.authGuard, post_controller_1.default.getPost);
exports.postRouter.put("/update-post", guard_1.authGuard, post_controller_1.default.updatePost);
exports.postRouter.delete("/delete-post/:id", guard_1.authGuard, post_controller_1.default.deletePost);
exports.postRouter.get("/get-user-posts", guard_1.authGuard, post_controller_1.default.getUserPosts);
exports.postRouter.post("/create-post", guard_1.authGuard, post_controller_1.default.createPost);
