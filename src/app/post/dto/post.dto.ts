import { Types } from "mongoose";
import { z } from "zod";

export const createPostDto = z.object({
  content: z.string("content is required").trim().min(1).max(200),
  allowComments: z.boolean("Allow comments is boolean").optional(),
});

export const updatePostDto = z.object({
  content: z.string("content is required").trim().min(1).max(200).optional(),
  allowComments: z.boolean("Allow comments is boolean").optional(),
  commentsCount: z.number("comments count is number").optional(),
  reactionCount: z.number("comments count is number").optional(),
  postId: z.string("Post Id is required").refine((value) => {
    return Types.ObjectId.isValid(value);
  }),
});
export const validatePostId = z.object({
  postId: z.string("Post Id is required").refine(
    (value) => {
      return Types.ObjectId.isValid(value);
    },
    { error: "Invalid Id" },
  ),
});
