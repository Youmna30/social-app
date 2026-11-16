"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noUsers = exports.userAlreadyExist = exports.userAlreadyVerified = exports.userNotVerified = exports.userNotExist = void 0;
const error_1 = require("../../pkg/error/error");
exports.userNotExist = new error_1.AppError("User isn't existed", 404);
exports.userNotVerified = new error_1.AppError("User isn't verified", 403);
exports.userAlreadyVerified = new error_1.AppError("User is already verified", 400);
exports.userAlreadyExist = new error_1.AppError("User already exists", 409);
exports.noUsers = new error_1.AppError("No Users available", 404);
