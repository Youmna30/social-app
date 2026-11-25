"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withCache = withCache;
const container_1 = __importDefault(require("../di/container"));
const tokens_1 = require("../di/tokens");
const cacheProvider = container_1.default.resolve(tokens_1.TOKENS.CacheProvider);
function withCache(ttl = 3600) {
    return async (req, res, next) => {
        const key = `${req.method}:${req.originalUrl}`;
        const cached = await cacheProvider.get(key);
        if (cached) {
            res.setHeader("X-Cache", "HIT");
            return res.json(JSON.parse(cached));
        }
        const originalJson = res.json.bind(res);
        res.json = (data) => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                res.setHeader("X-Cache", "MISS");
                cacheProvider.set(key, JSON.stringify(data), ttl);
            }
            return originalJson(data);
        };
        next();
    };
}
