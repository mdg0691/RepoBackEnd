import { json } from "express";
import { cartsService } from "../services/cart.service.js";
import { productsService } from "../services/products.service.js";

class CartsController {
  async findCarts(req, res) {
    try {
      const allCarts = await cartsService.findAllCarts();
      res.status(200).json({ message: "Carts", allCarts });
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  }

  
  async findOneCart(req, res) {
    const { idcart } = req.params;
    console.log(idcart);
    try {
      const response = await cartsService.findOneCart(idcart);
      res.status(200).json({ message: "Cart", response });
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  }
  async addToCart(req, res) {
    // const { id } = req.params;
    try {
    //   const newProduct = {
    //     id_prod: id,
    //   };
      console.log('antes de crear');
      const cart = await cartsService.createCart(req.body);
      console.log('producto adde to cart');
      res.status(200).json({ message: "product added to cart", cart });
    } catch (error) {
      console.error(error);
      throw new Error("Error occurred while posting cart.");
    }
  }
  async purchaseCart(req, res) {
    const id = req.params.id; // obtengo id del carrito mediante params 
    
    try {
      const cart = await cartsService.findOneCart({ _id: `${id}` });// busco el carrito mediante cartService

      if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
      }

    for (const item of cart.products) {// itero los productos de mi carrito con un for of

        const newObject = item.id_prod.toString() // guardo en newobjecto el string del id product .. con JSON.strigfy no me permitia por tamaño de bytes
        const product = await productsService.findOneProducts(newObject);// busco el producto 
        
        const requestedQuantity = item.cantidad;
        console.log(product.stock);
        if (product.stock >= requestedQuantity) {// verifico si tengo stock
            product.stock-- // operador -- para descontar stock
            console.log(product.stock)
            console.log(product.id)
            const productUpdated=await productsService.updatedProduct(product.id,product)// actualizo base de datos de product stock
            console.log("upda");
          console.log(productUpdated);
            console.log(`Hay suficiente cantidad de ${product.title} en stock.`);
        } else {
          console.log(`No hay suficiente cantidad de ${product.title} en stock.`);
        }
      }
      return res.json({ message: "Compra realizada exitosamente", cart });
    } catch (error) {
      throw new Error("error cart controller.");
    }
  }

  async deleteCart(req, res) {
    const id = req.params.id;
    try {
      const cart = await cartsService.deleteCart(id);
      res.status(200).json({ message: "product deleted from cart", cart });
    } catch (error) {
      throw new Error("Error occurred while deleting cart.");
    }
  }
}

export const cartsController = new CartsController();
