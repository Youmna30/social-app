import { Types } from "mongoose";

export interface IPost {
  content: string;
  userId: Types.ObjectId;
  isDeleted?: Boolean;
  commentsCount?: number;
  allowComments?: Boolean;
  reactionCount?: number;
}
