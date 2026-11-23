import { Router } from "express";
import authRouter from "./app/auth/auth.route";
import userRouter from "./app/user/user.route";
import followRouter from "./app/follow/follow.route";
import { postRouter } from "./app/post/post.route";

export const router = Router();
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/", followRouter);
router.use("/post",postRouter);
