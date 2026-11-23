import { Types } from "mongoose";
import { z } from "zod";

export const createCommentDto = z.object({
  content: z.string("content is required").trim().min(1).max(200),
  postId: z
    .string("Post Id is required")
    .refine((value) => {
      return Types.ObjectId.isValid(value);
    })
    .transform((value) => new Types.ObjectId(value)),
});

export const updateCommentDto = z.object({
  content: z.string("Content is required").trim().min(1).max(200).optional(),
  commentId: z
    .string("Comment Id is required")
    .refine((value) => {
      return Types.ObjectId.isValid(value);
    })
    .transform((value) => new Types.ObjectId(value)),
  postId: z
    .string("Post Id is required")
    .refine((value) => {
      return Types.ObjectId.isValid(value);
    })
    .transform((value) => new Types.ObjectId(value))
    .optional(),
});
export const validateCommentId = z.object({
  commentId: z.string("Comment Id is required").refine(
    (value) => {
      return Types.ObjectId.isValid(value);
    },
    { error: "Invalid Id" },
  ),
});
