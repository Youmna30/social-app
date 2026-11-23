import { Router } from "express";
import { authGuard } from "../../lib/auth/guard";
import CommentController from "./controller/comment.controller";
export const commentRouter = Router();
commentRouter.get("/get-comment/:id", authGuard, CommentController.getComment);
commentRouter.put(
  "/update-comment",
  authGuard,
  CommentController.updateComment,
);
commentRouter.delete(
  "/delete-comment/:id",
  authGuard,
  CommentController.deleteComment,
);
commentRouter.get(
  "/get-comment-post/:postId",
  authGuard,
  CommentController.getPostComments,
);
commentRouter.post(
  "/create-comment",
  authGuard,
  CommentController.createComment,
);
