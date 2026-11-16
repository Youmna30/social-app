"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = authGuard;
const errors_1 = require("../../app/auth/errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_js_1 = require("../config/env.js");
function authGuard(req, res, next) {
    try {
        const token = req.cookies.access_token;
        if (!token)
            throw errors_1.noToken;
        req.user = jsonwebtoken_1.default.verify(token, env_js_1.env.jwt.secretAccessKey);
        next();
    }
    catch (error) {
        next(error);
    }
}
