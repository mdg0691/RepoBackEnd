import { Router } from "express";
import { productController } from "../controllers/products.controller.js";


const productRouter = Router();

productRouter.get("/",productController.findAllProducts);
productRouter.get("/:productId", productController.findOneProduct);
productRouter.post("/",productController.createOneProduct);
productRouter.delete("/:productId",productController.deleteProduct);

export default productRouter;
