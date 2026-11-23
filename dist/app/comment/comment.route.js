"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = require("express");
const guard_1 = require("../../lib/auth/guard");
const comment_controller_1 = __importDefault(require("./controller/comment.controller"));
exports.commentRouter = (0, express_1.Router)();
exports.commentRouter.get("/get-comment/:id", guard_1.authGuard, comment_controller_1.default.getComment);
exports.commentRouter.put("/update-comment", guard_1.authGuard, comment_controller_1.default.updateComment);
exports.commentRouter.delete("/delete-comment/:id", guard_1.authGuard, comment_controller_1.default.deleteComment);
exports.commentRouter.get("/get-comment-post/:postId", guard_1.authGuard, comment_controller_1.default.getPostComments);
exports.commentRouter.post("/create-comment", guard_1.authGuard, comment_controller_1.default.createComment);
