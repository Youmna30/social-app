"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 200,
    },
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
    },
    commentsCount: {
        type: Number,
        default: 0,
    },
    reactionCount: {
        type: Number,
        default: 0,
    },
    allowComments: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
exports.Post = (0, mongoose_1.model)("Post", postSchema);
