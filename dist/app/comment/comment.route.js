"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = require("express");
const guard_1 = require("../../lib/auth/guard");
const container_1 = __importDefault(require("../../lib/di/container"));
const tokens_1 = require("../../lib/di/tokens");
exports.commentRouter = (0, express_1.Router)();
const commentController = container_1.default.resolve(tokens_1.TOKENS.CommentController);
exports.commentRouter.get("/get-comment/:id", guard_1.authGuard, commentController.getComment);
exports.commentRouter.put("/update-comment", guard_1.authGuard, commentController.updateComment);
exports.commentRouter.delete("/delete-comment/:id", guard_1.authGuard, commentController.deleteComment);
exports.commentRouter.get("/get-comment-post/:postId", guard_1.authGuard, commentController.getPostComments);
exports.commentRouter.post("/create-comment", guard_1.authGuard, commentController.createComment);
