import { Router } from "express";
import * as authCtrl from '../controllers/auth.controller.js'
const authRouter = Router();

authRouter.post("/singup", authCtrl.signUp);
authRouter.post("/singin", authCtrl.signIn);

export default authRouter;
