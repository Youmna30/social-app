"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const error_js_1 = require("../../pkg/error/error.js");
class Validator {
    // Generic validation method
    static validate(dto, body) {
        const result = dto.safeParse(body);
        if (!result.success) {
            const errorMessage = result.error.issues.map(issue => {
                const field = issue.path.map(String).join(".") || "error";
                return `${field}: ${issue.message}`;
            });
            throw new error_js_1.AppError(errorMessage.join(", "), 400);
        }
        return result.data;
    }
}
exports.Validator = Validator;
