"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGoogleToken = verifyGoogleToken;
const google_auth_library_1 = require("google-auth-library");
const error_1 = require("../../pkg/error/error");
const env_js_1 = require("../config/env.js");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
async function verifyGoogleToken(idToken) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: env_js_1.env.google.googleWebClientId,
        });
        const payload = ticket.getPayload();
        return payload;
    }
    catch (error) {
        throw new error_1.AppError("Invalid Google token", 403);
    }
}
