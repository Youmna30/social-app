import { Router } from "express";
import { authGuard } from "../../lib/auth/guard";
import container from "../../lib/di/container";
import { TOKENS } from "../../lib/di/tokens";
import { CommentController } from "./controller/comment.controller";

export const commentRouter = Router();

const commentController = container.resolve<CommentController>(
  TOKENS.CommentController,
);
commentRouter.get("/get-comment/:id", authGuard, commentController.getComment);
commentRouter.put(
  "/update-comment",
  authGuard,
  commentController.updateComment,
);
commentRouter.delete(
  "/delete-comment/:id",
  authGuard,
  commentController.deleteComment,
);
commentRouter.get(
  "/get-comment-post/:postId",
  authGuard,
  commentController.getPostComments,
);
commentRouter.post(
  "/create-comment",
  authGuard,
  commentController.createComment,
);
