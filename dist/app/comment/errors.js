"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noCommentAllowed = exports.unVerifiedNotAllowed = exports.unAuthorisedCommentDelete = exports.unAuthorisedCommentUpdate = exports.noComment = void 0;
const error_1 = require("../../pkg/error/error");
exports.noComment = new error_1.AppError("No Comment found", 404);
exports.unAuthorisedCommentUpdate = new error_1.AppError("You aren't unauthorised to update this post", 403);
exports.unAuthorisedCommentDelete = new error_1.AppError("You aren't unauthorised to delete this post", 403);
exports.unVerifiedNotAllowed = new error_1.AppError("You aren't verified to make a post", 403);
exports.noCommentAllowed = new error_1.AppError("You aren't allowed to comment on this post", 403);
