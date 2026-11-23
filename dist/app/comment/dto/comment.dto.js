"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCommentId = exports.updateCommentDto = exports.createCommentDto = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.createCommentDto = zod_1.z.object({
    content: zod_1.z.string("content is required").trim().min(1).max(200),
    postId: zod_1.z
        .string("Post Id is required")
        .refine((value) => {
        return mongoose_1.Types.ObjectId.isValid(value);
    })
        .transform((value) => new mongoose_1.Types.ObjectId(value)),
});
exports.updateCommentDto = zod_1.z.object({
    content: zod_1.z.string("Content is required").trim().min(1).max(200).optional(),
    commentId: zod_1.z
        .string("Comment Id is required")
        .refine((value) => {
        return mongoose_1.Types.ObjectId.isValid(value);
    })
        .transform((value) => new mongoose_1.Types.ObjectId(value)),
    postId: zod_1.z
        .string("Post Id is required")
        .refine((value) => {
        return mongoose_1.Types.ObjectId.isValid(value);
    })
        .transform((value) => new mongoose_1.Types.ObjectId(value))
        .optional(),
});
exports.validateCommentId = zod_1.z.object({
    commentId: zod_1.z.string("Comment Id is required").refine((value) => {
        return mongoose_1.Types.ObjectId.isValid(value);
    }, { error: "Invalid Id" }),
});
