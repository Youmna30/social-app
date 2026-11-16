"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followDto = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.followDto = zod_1.z.object({
    followerId: zod_1.z
        .string("follower is required")
        .trim()
        .refine((value) => {
        return mongoose_1.Types.ObjectId.isValid(value);
    }),
});
