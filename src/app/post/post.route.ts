import { Router } from "express";
import { authGuard } from "../../lib/auth/guard";
import PostController from "./controller/post.controller";

export const postRouter = Router();
postRouter.get("/get-post/:id", authGuard, PostController.getPost);
postRouter.put("/update-post", authGuard, PostController.updatePost);
postRouter.delete("/delete-post/:id", authGuard, PostController.deletePost);
postRouter.get("/get-user-posts", authGuard, PostController.getUserPosts);
postRouter.post("/create-post", authGuard, PostController.createPost);
