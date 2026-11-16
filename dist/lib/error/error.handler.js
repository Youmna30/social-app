"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = globalErrorHandler;
const logger_1 = require("../../pkg/logger/logger");
function globalErrorHandler(err, req, res, next) {
    logger_1.logger.error(err.message, {
        stack: err.stack,
        // correlationId: req.correlationId
    }); // to be removed on production
    if (err.isOperational === true) {
        return res.status(err.statusCode).json({
            message: err.message,
            success: false,
            stack: err.stack, // to be removed on production
        });
    }
    return res.status(500).json({
        message: "Something went wrong",
        success: false,
        stack: err.stack,
    });
}
