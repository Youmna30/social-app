"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_js_1 = require("./app.js");
const mongoose_1 = __importDefault(require("mongoose"));
const env_js_1 = require("./lib/config/env.js");
const logger_js_1 = require("./pkg/logger/logger.js");
const app = (0, app_js_1.createApp)();
const server = http_1.default.createServer(app);
app.listen(env_js_1.env.port, () => {
    logger_js_1.logger.info("Server is running on port " + env_js_1.env.port);
});
function shutdown() {
    server.close(async () => {
        await mongoose_1.default.disconnect();
        process.exit(0);
    });
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
