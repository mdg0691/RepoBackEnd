import { Router } from "express";
import { usersController } from "../controllers/users.controller.js";
import { authJwt } from "../middlewares/index.js";

const userRouter = Router();

userRouter.get("/", usersController.findAllUsers);
userRouter.get("/:idUser", usersController.findOneUser);
// userRouter.post("/", usersController.createOneUser);
userRouter.delete("/:idUser", [authJwt.authToken,authJwt.isAdmin],usersController.deleteOne);
userRouter.delete("/delete",[authJwt.authToken,authJwt.isAdmin],usersController.deleteAll);

export default userRouter;
