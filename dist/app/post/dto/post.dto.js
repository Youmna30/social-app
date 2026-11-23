"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePostId = exports.updatePostDto = exports.createPostDto = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.createPostDto = zod_1.z.object({
    content: zod_1.z.string("content is required").trim().min(1).max(200),
    allowComments: zod_1.z.boolean("Allow comments is boolean").optional(),
});
exports.updatePostDto = zod_1.z.object({
    content: zod_1.z.string("content is required").trim().min(1).max(200).optional(),
    allowComments: zod_1.z.boolean("Allow comments is boolean").optional(),
    commentsCount: zod_1.z.number("comments count is number").optional(),
    reactionCount: zod_1.z.number("comments count is number").optional(),
    postId: zod_1.z.string("Post Id is required").refine((value) => {
        return mongoose_1.Types.ObjectId.isValid(value);
    }),
});
exports.validatePostId = zod_1.z.object({
    postId: zod_1.z.string("Post Id is required").refine((value) => {
        return mongoose_1.Types.ObjectId.isValid(value);
    }, { error: "Invalid Id" }),
});
