import { Router } from "express";
import * as authCtrl from '../controllers/auth.controller.js'
import { authJwt } from "../middlewares/index.js";
const authRouter = Router();

authRouter.post("/singup", authCtrl.signUp);
authRouter.post("/signin", authCtrl.signIn);
authRouter.post("/logout",authCtrl.logout)

authRouter.post("/forgot-password", authCtrl.forgotPassword)
authRouter.get("/reset-password/:id/:token",[authJwt.authToken], authCtrl.resetPassword)
authRouter.post("/reset-password/:id", authCtrl.updatedPassword)  
  
export default authRouter;
