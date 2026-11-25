"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("./lib/db/mongoose");
const cors_1 = __importDefault(require("cors"));
const error_handler_1 = require("./lib/error/error.handler");
const router_1 = require("./router");
// import { generateCorrelationId } from "./pkg/correlation/correlationId.js";
const cookie_parser_1 = __importDefault(require("cookie-parser"));
function createApp() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: "http://localhost:4200",
    }));
    app.use("/uploads", express_1.default.static("uploads"));
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    // app.use( generateCorrelationId );
    app.use("/api", router_1.router);
    app.use(error_handler_1.globalErrorHandler);
    return app;
}
