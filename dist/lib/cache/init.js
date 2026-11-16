"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheProvider = void 0;
const redis_js_1 = require("../../pkg/cache/redis.js");
const env_js_1 = require("../config/env.js");
exports.cacheProvider = new redis_js_1.RedisCacheProvider({
    host: env_js_1.env.redis.host,
    port: env_js_1.env.redis.port,
    password: env_js_1.env.redis.password || ""
});
