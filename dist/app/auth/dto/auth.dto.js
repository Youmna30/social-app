"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginConfirmationDto = exports.verifyEnableTwoStepVerificationDto = exports.resetPasswordDTO = exports.sendOtpDTO = exports.verifyAccountDTO = exports.loginDTO = exports.registerDTO = void 0;
const zod_1 = require("zod");
const enum_1 = require("../../user/enum/enum");
exports.registerDTO = zod_1.z.object({
    username: zod_1.z.string("Username is required").min(2).max(20).trim(),
    email: zod_1.z.email("Email is required").toLowerCase().trim(),
    password: zod_1.z.string("Password is required").min(8).max(16).trim(),
    gender: zod_1.z.enum(enum_1.Gender).optional(),
});
exports.loginDTO = zod_1.z.object({
    email: zod_1.z.email("Email is required").toLowerCase().trim(),
    password: zod_1.z.string("Password is required").min(8).max(16).trim(),
});
exports.verifyAccountDTO = zod_1.z.object({
    email: zod_1.z.email("Email is required").toLowerCase().trim(),
    code: zod_1.z.string("Code is required").length(6).trim(),
});
exports.sendOtpDTO = zod_1.z.object({
    email: zod_1.z.email("Email is required").toLowerCase().trim(),
});
exports.resetPasswordDTO = zod_1.z.object({
    email: zod_1.z.email("Email is required").toLowerCase().trim(),
    code: zod_1.z.string("Code is required").length(6).trim(),
    newPassword: zod_1.z.string("New password is required").min(8).max(16).trim(),
});
exports.verifyEnableTwoStepVerificationDto = zod_1.z.object({
    code: zod_1.z.string("Code is required").length(6).trim(),
});
exports.loginConfirmationDto = zod_1.z.object({
    email: zod_1.z.email("Email is required").toLowerCase().trim(),
    code: zod_1.z.string("Code is required").length(6).trim(),
});
