import { Router } from "express";
import { authGuard } from "../../lib/auth/guard";
import { TOKENS } from "../../lib/di/tokens";
import container from "../../lib/di/container";
import { UserController } from "./controller/user.controller";

const userRouter = Router();
const userController = container.resolve<UserController>(TOKENS.UserController);
userRouter.get("/get-profile", authGuard, userController.getProfile);
userRouter.put("/update-profile", authGuard, userController.updateProfile);
userRouter.put("/change-privacy", authGuard, userController.changePrivacy);
userRouter.get("/search-users", authGuard, userController.searchUsers);

export default userRouter;
