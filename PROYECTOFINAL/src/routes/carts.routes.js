import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";

const cartsRouter = Router()

cartsRouter.get("/", cartsController.findCarts)

cartsRouter.get("/:idcart", cartsController.findCartById)


cartsRouter.post("/updatedcart", cartsController.updatedCart)

cartsRouter.post("/:id/purchase", cartsController.purchaseCart)

cartsRouter.post("/addtocart", cartsController.addToCart)

cartsRouter.put("/removeproduct", cartsController.deleteProductFromCart )
cartsRouter.delete("/:id", cartsController.deleteProductFromCart )

export default cartsRouter