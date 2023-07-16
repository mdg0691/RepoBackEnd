import { Router } from "express";
import { productController } from "../controllers/products.controller.js";
// import { verifyToken } from "../middlewares/auth.js";
import { authToken } from "../utils/jwt.js";

const productRouter = Router();

productRouter.get("/", productController.findAllProducts);
productRouter.get("/:idUser", productController.findOneProduct);
productRouter.post("/", authToken,productController.createOneProduct);
productRouter.delete("/:idUser", productController.deleteProduct);

export default productRouter;
