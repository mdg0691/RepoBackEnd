import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";

const cartsRouter = Router()

cartsRouter.get("/", cartsController.findCarts)

cartsRouter.get("/:idcart", cartsController.findOneCart)

cartsRouter.post("/:id/purchase", cartsController.purchaseCart)

cartsRouter.post("/addtocart", cartsController.addToCart)

cartsRouter.delete("/:id", cartsController.deleteCart )

export default cartsRouter