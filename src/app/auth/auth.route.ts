import { Router } from "express";
import { AuthController } from "./controller/auth.controller";
import container from "../../lib/di/container";
import { TOKENS } from "../../lib/di/tokens";

const authRouter = Router();
const authController = container.resolve<AuthController>(TOKENS.AuthController);

authRouter.post("/register", authController.register);
authRouter.patch("/verify-account", authController.verifyAccount);
authRouter.post("/login", authController.login);
authRouter.post("/google-login", authController.loginWithGoogle);
authRouter.post("/refresh-token", authController.refreshToken);
authRouter.post("/logout", authController.logout);

export default authRouter;
