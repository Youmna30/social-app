import { AppError } from "../../pkg/error/error";

export const followExists = new AppError("Follow is already existed", 409);
export const NoFollowExists = new AppError("Follow isn't existed", 404);
export const noFollowYourself = new AppError("You Can't follow yourself", 409);
