"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
exports.decodeToken = decodeToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_js_1 = require("../../../lib/config/env.js");
const errors_js_1 = require("../errors.js");
function generateAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, env_js_1.env.jwt.secretAccessKey, { expiresIn: "1h" });
}
function generateRefreshToken(payload) {
    return jsonwebtoken_1.default.sign(payload, env_js_1.env.jwt.secretRefreshKey, { expiresIn: "7d" });
}
async function decodeToken(token) {
    try {
        const user = jsonwebtoken_1.default.verify(token, env_js_1.env.jwt.secretRefreshKey);
        return user;
    }
    catch (error) {
        throw errors_js_1.invalidRefreshToken;
    }
}
