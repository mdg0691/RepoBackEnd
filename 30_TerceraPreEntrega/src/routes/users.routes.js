import { Router } from "express";
import { usersController } from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.get("/", usersController.findAllUsers);
userRouter.get("/:idUser", usersController.findOneUser);
userRouter.post("/", usersController.createOneUser);
userRouter.delete("/:idUser", usersController.deleteOne);

export default userRouter;
