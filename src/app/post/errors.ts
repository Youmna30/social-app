import { AppError } from "../../pkg/error/error";

export const noPost = new AppError("No Post found", 404);
export const unAuthorisedPostUpdate = new AppError(
  "You aren't unauthorised to update this post",
  403,
);
export const unAuthorisedPostDelete = new AppError(
  "You aren't unauthorised to delete this post",
  403,
);
export const unVerifiedNotAllowed = new AppError(
  "You aren't verified to make a post",
  403,
);
