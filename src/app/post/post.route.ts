import { Router } from "express";
import { authGuard } from "../../lib/auth/guard";
import { PostController } from "./controller/post.controller";
import container from "../../lib/di/container";
import { TOKENS } from "../../lib/di/tokens";

export const postRouter = Router();
const postController = container.resolve<PostController>(TOKENS.PostController);

postRouter.get("/get-post/:id", authGuard, postController.getPost);
postRouter.put("/update-post", authGuard, postController.updatePost);
postRouter.delete("/delete-post/:id", authGuard, postController.deletePost);
postRouter.get("/get-user-posts", authGuard, postController.getUserPosts);
postRouter.post("/create-post", authGuard, postController.createPost);
