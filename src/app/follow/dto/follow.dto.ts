import { Types } from "mongoose";
import { z } from "zod";
export const followDto = z.object({
  followerId: z
    .string("follower is required")
    .trim()
    .refine((value) => {
      return Types.ObjectId.isValid(value);
    }),
});
