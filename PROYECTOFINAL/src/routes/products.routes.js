import { Router } from "express";
import { productController } from "../controllers/products.controller.js";
import { authJwt } from "../middlewares/index.js";


const productRouter = Router();

productRouter.get("/",productController.findAllProducts);
productRouter.get("/:productId", productController.findOneProduct);
productRouter.post("/",productController.createOneProduct);
productRouter.delete("/:productId",[authJwt.isAdmin],productController.deleteProduct);

export default productRouter;
