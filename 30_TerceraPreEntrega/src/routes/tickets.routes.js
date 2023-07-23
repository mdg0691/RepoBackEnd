import { Router } from "express";
import { ticketsController } from "../controllers/ticket.controller.js";


const ticketsRouter = Router()

ticketsRouter.get("/", ticketsController.findAllTickets)

ticketsRouter.get("/:idcart", ticketsController.findOneTicket)

ticketsRouter.post("/create", ticketsController.createOneTicket)

ticketsRouter.delete("/:id", ticketsController.deleteOne )

export default ticketsRouter