import { cartsService } from "../services/cart.service.js";
import { productsService } from "../services/products.service.js";
import { usersService} from "../services/users.service.js"

class CartsController {
  async findCarts(req, res) {
    try {
      const allCarts = await cartsService.findAllCarts()
      res.status(200).json({ message: "Carts", allCarts });
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  }

  
  async findOneCart(req, res) {
    const { idcart } = req.params;
    console.log(idcart);
    try {
      const response = await cartsService.findOneCart( idcart)
      res.status(200).json({ message: "Cart", response });
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  }

  async findCartById(req, res) {
    const { idcart } = req.params;
    console.log(idcart);
    try {
      const response = await cartsService.findCartById(idcart)
      res.status(200).json({ message: "Cart", response });
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  }
  async addToCart(req, res) {
    console.log(req.body);
    const { userId } = req.body
    try {
      const cart = await cartsService.createCart(req.body);    
    // Actualizo cart en DB user
      const updateuser = await usersService.findOneAndUpdate(userId, { cart: cart._id })
      console.log(updateuser);
      res.status(200).json({message:['product added to cart'],cart})
       
    } catch (error) {
      console.error(error);
      throw new Error("Error occurred while posting cart.");
    }
  }

  async updatedCart(req, res) {
    console.log("test to updated");
    console.log(req.body);
    const{cartId} =req.body
    try {    
      
      const updatedcart = await cartsService.findOneAndUpdate(cartId, req.body)
      console.log(updatedcart);
      res.status(200).json({message:['product updated to cart'],updatedcart})
       
    } catch (error) {
      console.error(error);
      throw new Error("Error occurred while posting cart.");
    }
  }
  async purchaseCart(req, res) {
    const id = req.params.id; // obtengo id del carrito mediante params 
    console.log(id);
    try {
      const cart = await cartsService.findCartById(id);// busco el carrito mediante cartService
      console.log("carrito recibido",cart);
      if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
      }  
    for (const item of cart.products) {// itero los productos de mi carrito con un for of

        const idProduct = item.id_prod._id // guardo en newobjecto el string del id product .. con JSON.strigfy no me permitia por tamaño de bytes
        console.log("id del Producto",idProduct);
        const product = await productsService.findOneProducts(idProduct);// busco el producto 
        console.log("producto a comprar",product);
        console.log("cantidad",item.cantidad);
        const requestedQuantity = item.cantidad;
        console.log(product.stock);
        if (product.stock >= requestedQuantity) {// verifico si tengo stock
            product.stock-=requestedQuantity // operador -- para descontar stock
            console.log(product.stock)
            console.log(product.id)
            const productUpdated=await productsService.updatedProduct(product.id,product)// actualizo base de datos de product stock
            console.log("updated",productUpdated);
            console.log(`Hay suficiente cantidad de ${product.title} en stock.`);
        } else {
          console.log(`No hay suficiente cantidad de ${product.title} en stock.`);
        }
      }

      await cartsService.deleteCart(id);

      return res.json({ message: "Compra realizada exitosamente", cart });
    } catch (error) {
      throw new Error("error cart controller.");
    }
  }

  async deleteCartProduct(req, res) {
    const { cartId, productId } = req.body;
    console.log("1");
    console.log(typeof(productId));
    // const productIdJson = JSON.parse(productId)
    try {
      const cart = await cartsService.findCartById(cartId)
      console.log(cart.products);
      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }
      console.log(2);
      // cart.products = cart.products.filter(product => JSON.stringify(product.id_prod) !== productId);
      cart.products = cart.products.filter(product => {
        console.log('Producto en proceso:', product.id_prod._id);
        return product.id_prod._id.toString() !== productId;
      });
      console.log("afterupdates");
      console.log(cart.products);
      
      const updatedCart = await cart.save();

      res.status(200).json({ message: 'Producto eliminado del carrito', cart: updatedCart });
      
    } catch (error) {
      throw new Error("Error occurred while deleting cart.");
    }
  }
}

export const cartsController = new CartsController();
