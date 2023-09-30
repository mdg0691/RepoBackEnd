import { cartModel } from "../DAL/mongoDB/models/carts.model.js";
import { productsService } from "../services/products.service.js";
import { usersService } from "../services/users.service.js";
import { trasporter } from "../utils/nodemailer.js";

class ProductsController {
  async findAllProducts(req, res) {
    try {
      const allProducts = await productsService.findAllProducts();
      res.status(200).json({ message: "Products", allProducts });
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  }
  async findOneProduct(req, res) {
    const { productId } = req.params;
    try {
      const response = await productsService.findOneProducts(productId);
      res.status(200).json({ message: "Product", response });
    } catch (error) {
      res.status(500).json({ message: "Error controller", error });
    }
  }
  async createOneProduct(req, res) {
    const { name, price, stock } = req.body;
    if (!name || !price || !stock) {
      res.status(501).json({ message: "Some data is missing" });
    }
    try {
      const newProduct = await productsService.createOneProduct(req.body);
      res.status(200).json({ message: "Product Created", newProduct });
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  }

  async deleteProduct(req, res) {
    const { productId } = req.params;
    try {
      const productDeleted = await productsService.deleteOneProduct(productId);

      // cart with product deleted
      const cartIdwithProduct = await cartModel.find({
        "products.id_prod": productId,
      });

      // Itero los cart que contiene el producto eliminado
      for (const cartId of cartIdwithProduct) {
        try {
          const userId = cartId.userId;
          // obtengo el id del usuario del carrito para enviar mail de notificacion producto eliminado
          const user = await usersService.findOneById(userId);
          await trasporter.sendMail({
            to: user.email,
            subject: "PRODUCTO ELIMINADO",
            text: `Estimado cliente el producto ${productId}`,
          });
        } catch (error) {
          res.status(500).json({ message: "Error", error });
        }
      }

      // Actualiza los carritos para quitar el producto eliminado
      await cartModel.updateMany(
        { "products.id_prod": productId },
        { $pull: { products: { id_prod: productId } } }
      );

      res.status(200).json({message: "Product deleted and notified to users",productId});
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  }
}

export const productController = new ProductsController();
