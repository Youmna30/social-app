import { Types } from "mongoose";

export interface IComment {
  content: string;
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  isDeleted?: boolean;
}
