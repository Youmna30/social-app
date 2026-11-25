"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const guard_1 = require("../../lib/auth/guard");
const container_1 = __importDefault(require("../../lib/di/container"));
const tokens_1 = require("../../lib/di/tokens");
exports.postRouter = (0, express_1.Router)();
const postController = container_1.default.resolve(tokens_1.TOKENS.PostController);
exports.postRouter.get("/get-post/:id", guard_1.authGuard, postController.getPost);
exports.postRouter.put("/update-post", guard_1.authGuard, postController.updatePost);
exports.postRouter.delete("/delete-post/:id", guard_1.authGuard, postController.deletePost);
exports.postRouter.get("/get-user-posts", guard_1.authGuard, postController.getUserPosts);
exports.postRouter.post("/create-post", guard_1.authGuard, postController.createPost);
