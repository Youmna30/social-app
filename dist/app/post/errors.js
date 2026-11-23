"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unVerifiedNotAllowed = exports.unAuthorisedPostDelete = exports.unAuthorisedPostUpdate = exports.noPost = void 0;
const error_1 = require("../../pkg/error/error");
exports.noPost = new error_1.AppError("No Post found", 404);
exports.unAuthorisedPostUpdate = new error_1.AppError("You aren't unauthorised to update this post", 403);
exports.unAuthorisedPostDelete = new error_1.AppError("You aren't unauthorised to delete this post", 403);
exports.unVerifiedNotAllowed = new error_1.AppError("You aren't verified to make a post", 403);
