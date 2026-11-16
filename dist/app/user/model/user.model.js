"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../enum/enum");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        toLowerCase: true,
    },
    password: {
        type: String,
        required: function () {
            return this.provider === enum_1.Provider.LOCAL;
        },
        trim: true,
        minlength: 6,
    },
    provider: {
        type: Number,
        enum: [enum_1.Provider.LOCAL, enum_1.Provider.GOOGLE, enum_1.Provider.FACEBOOK],
        default: enum_1.Provider.LOCAL,
    },
    gender: {
        type: Number,
        enum: [enum_1.Gender.MALE, enum_1.Gender.FEMALE],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isPrivate: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)("User", userSchema);
