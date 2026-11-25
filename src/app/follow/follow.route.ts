import { Router } from "express";
import { authGuard } from "../../lib/auth/guard";
import { FollowController } from "./controller/follow.controller";
import container from "../../lib/di/container";
import { TOKENS } from "../../lib/di/tokens";

const followRouter = Router();
const followController = container.resolve<FollowController>(
  TOKENS.FollowController,
);

followRouter.post("/follow", authGuard, followController.follow);
followRouter.post("/unfollow", authGuard, followController.unFollow);

export default followRouter;
