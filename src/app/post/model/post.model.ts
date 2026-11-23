import { Schema, Types, model } from "mongoose";
import { IPost } from "../interface/post.interface";

const postSchema = new Schema<IPost>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 200,
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    reactionCount: {
      type: Number,
      default: 0,
    },
    allowComments: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Post = model("Post", postSchema);
