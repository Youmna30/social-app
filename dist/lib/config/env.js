"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const schema = zod_1.z.object({
    PORT: zod_1.z.string().default("3000"),
    MONGODB_URL: zod_1.z.string(),
    JWT_SECRET_ACCESS_KEY: zod_1.z.string(),
    JWT_SECRET_REFRESH_KEY: zod_1.z.string(),
    REDIS_HOST: zod_1.z.string(),
    REDIS_PORT: zod_1.z.string().default("6379"),
    REDIS_PASSWORD: zod_1.z.string().optional(),
    MAIL_USER: zod_1.z.string().trim().toLowerCase(),
    MAIL_PASSWORD: zod_1.z.string(),
    MAIL_NAME: zod_1.z.string(),
    GOOGLE_WEB_OAUTH_CLIENT_ID: zod_1.z.string(),
    MAILJET_API_KEY: zod_1.z.string(),
    MAILJET_API_SECRET: zod_1.z.string()
});
const parsed = schema.parse(process.env);
exports.env = {
    port: Number(parsed.PORT),
    db: {
        url: parsed.MONGODB_URL
    },
    redis: {
        host: parsed.REDIS_HOST,
        port: Number(parsed.REDIS_PORT),
        password: parsed.REDIS_PASSWORD
    },
    nodemailer: {
        user: parsed.MAIL_USER,
        password: parsed.MAIL_PASSWORD
    },
    jwt: {
        secretAccessKey: parsed.JWT_SECRET_ACCESS_KEY,
        secretRefreshKey: parsed.JWT_SECRET_REFRESH_KEY
    },
    google: {
        googleWebClientId: parsed.GOOGLE_WEB_OAUTH_CLIENT_ID
    },
    mailjet: {
        apiKey: parsed.MAILJET_API_KEY,
        apiSecret: parsed.MAILJET_API_SECRET,
        fromEmail: parsed.MAIL_USER,
        fromName: parsed.MAIL_NAME
    }
};
