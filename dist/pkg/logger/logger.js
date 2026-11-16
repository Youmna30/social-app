"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
class Logger {
    static instance;
    constructor() {
        if (!Logger.instance) {
            Logger.instance = this;
        }
        return Logger.instance;
    }
    log(level, message, metaData = {}) {
        let messageObj = {
            level,
            message,
            timestamp: new Date().toISOString(),
            ...metaData
        };
        console.log(JSON.stringify(messageObj));
    }
    error(message, metaData = {}) {
        this.log("error", message, metaData);
    }
    info(message, metaData = {}) {
        this.log("info", message, metaData);
    }
    debug(message, metaData = {}) {
        this.log("debug", message, metaData);
    }
}
exports.logger = new Logger();
