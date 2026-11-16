import { Router } from "express";
import UserController from "./controller/user.controller";
// import { checkIdempotency } from "../../lib/idempotency/idEmpotency.";
import { authGuard } from "../../lib/auth/guard";
const userRouter = Router();

userRouter.get("/get-profile", authGuard, UserController.getProfile);
userRouter.put("/update-profile", authGuard, UserController.updateProfile);
userRouter.put("/change-privacy", authGuard, UserController.changePrivacy);
userRouter.get("/search-users", authGuard, UserController.searchUsers);

export default userRouter;
