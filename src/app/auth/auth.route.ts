import { Router } from "express";
import AuthController from "./controller/auth.controller";
// import { checkIdempotency } from "../../lib/idempotency/idEmpotency.";
// import { authGuard } from '../../lib/auth/guard.js';
const authRouter = Router();

authRouter.post("/register", AuthController.register);
authRouter.patch("/verify-account", AuthController.verifyAccount);
authRouter.post("/login", AuthController.login);
authRouter.post("/google-login", AuthController.loginWithGoogle);
authRouter.post("/refresh-token", AuthController.refreshToken);
authRouter.post("/logout", AuthController.logout);

export default authRouter;
