
import { z } from "zod";
import { AppError } from "../../pkg/error/error.js";

export class Validator {

    // Generic validation method
    public static validate<T extends z.ZodType>(
        dto: T,
        body: unknown
    ): z.output<T> {

        const result = dto.safeParse(body);

        if (!result.success) {

            const errorMessage = result.error.issues.map(issue => {
                const field = issue.path.map(String).join(".") || "error";
                return `${field}: ${issue.message}`;
            });

            throw new AppError(errorMessage.join(", "), 400);
        }

        return result.data;
    }
}
