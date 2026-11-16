"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withCache = withCache;
const init_1 = require("./init");
function withCache(ttl = 3600) {
    return async (req, res, next) => {
        const key = `${req.method}:${req.originalUrl}`;
        const cached = await init_1.cacheProvider.get(key);
        if (cached) {
            res.setHeader("X-Cache", "HIT");
            return res.json(JSON.parse(cached));
        }
        const originalJson = res.json.bind(res);
        res.json = (data) => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                res.setHeader("X-Cache", "MISS");
                init_1.cacheProvider.set(key, JSON.stringify(data), ttl);
            }
            return originalJson(data);
        };
        next();
    };
}
