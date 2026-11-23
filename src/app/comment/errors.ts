import { AppError } from "../../pkg/error/error";

export const noComment = new AppError("No Comment found", 404);
export const unAuthorisedCommentUpdate = new AppError(
  "You aren't unauthorised to update this post",
  403,
);
export const unAuthorisedCommentDelete = new AppError(
  "You aren't unauthorised to delete this post",
  403,
);
export const unVerifiedNotAllowed = new AppError(
  "You aren't verified to make a post",
  403,
);
export const noCommentAllowed = new AppError(
  "You aren't allowed to comment on this post",
  403,
);
