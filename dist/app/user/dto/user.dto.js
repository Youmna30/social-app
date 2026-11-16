"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserDTO = void 0;
const zod_1 = require("zod");
const enum_1 = require("../enum/enum");
exports.updateUserDTO = zod_1.z.object({
    username: zod_1.z.string().min(2).max(20).trim().optional(),
    email: zod_1.z.string().email().toLowerCase().trim().optional(),
    gender: zod_1.z.enum(enum_1.Gender).optional(),
});
