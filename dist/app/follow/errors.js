"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noFollowYourself = exports.NoFollowExists = exports.followExists = void 0;
const error_1 = require("../../pkg/error/error");
exports.followExists = new error_1.AppError("Follow is already existed", 409);
exports.NoFollowExists = new error_1.AppError("Follow isn't existed", 404);
exports.noFollowYourself = new error_1.AppError("You Can't follow yourself", 409);
