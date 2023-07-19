import { Router } from "express";
import { messageController } from "../controllers/messages.controller.js";
// import { authJwt } from "../middlewares/index.js";

const messageRouter = Router();

messageRouter.get("/", messageController.findAllMessages);
messageRouter.get("/:productId", messageController.findOneMessage);
messageRouter.post("/", messageController.createOneMessages);
messageRouter.delete("/:productId",messageController.deleteMessage);

export default messageRouter;
