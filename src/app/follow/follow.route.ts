import { Router } from "express";
import { authGuard } from "../../lib/auth/guard";
import FollowController from "./controller/follow.controller";

const followRouter = Router();

followRouter.post("/follow", authGuard, FollowController.follow);
followRouter.post("/unfollow", authGuard, FollowController.unFollow);

export default followRouter;
