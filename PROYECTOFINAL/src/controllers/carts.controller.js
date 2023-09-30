import { ticketModel } from "../DAL/mongoDB/models/tickets.model.js";
import { cartsService } from "../services/cart.service.js";
import { productsService } from "../services/products.service.js";
import { ticketService } from "../services/tickets.service.js";
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
    try {
      const response = await cartsService.findOneCart( idcart)
      res.status(200).json({ message: "Cart", response });
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  }

  async findCartById(req, res) {
    const { idcart } = req.params;
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
    try {
      const cart = await cartsService.findCartById(id);// busco el carrito mediante cartService
      console.log("carrito recibido",cart);
      const userId = cart.userId
      
      console.log("id del usuario" , userId);// purcharser


      if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
      } 
      const ticket = {
        purchaser: userId , // Set this later
        products: [],
        amount: 0,
      };
    for (const item of cart.products) {// itero los productos de mi carrito con un for of

        const idProduct = item.id_prod._id // guardo en newobjecto el string del id product .. con JSON.strigfy no me permitia por tamaño de bytes
        console.log("id del Producto",idProduct);
        const product = await productsService.findOneProducts(idProduct);// busco el producto 
        console.log("producto a comprar",product.title);
        console.log("cantidad",item.cantidad);
        const requestedQuantity = item.cantidad;
        console.log("stock del producto",product.stock);
        
        if (product.stock >= requestedQuantity) {// verifico si tengo stock
            product.stock-=requestedQuantity // operador -- para descontar stock
            
            const productUpdated=await productsService.updatedProduct(product.id,product)// actualizo base de datos de product stock
            
            const productPrice= product.price
            const subtotal = parseFloat((requestedQuantity * productPrice).toFixed(2));

        const ticketProduct = {
          id_prod: product._id,
          cantidad: requestedQuantity,
          subtotal: subtotal, // Include the subtotal for the product
        };
            
            ticket.products.push(ticketProduct);
            
        } else {
          console.log(`No hay suficiente cantidad de ${product.title} en stock.`);
        }
      }


      // Calculate the total amount based on purchased products
      const total = parseFloat(
        ticket.products.reduce(
          (accumulatedTotal, product) => accumulatedTotal + product.subtotal,
          0
        ).toFixed(2) // Calculate and parse total as a number with 2 decimal places
      );
  
      ticket.amount = total; // Set the total amount in the ticket
  
      console.log("Ticket", ticket);

      
      // Save the ticket to the database
      const createdTicket = await ticketService.createTicket(ticket)
      
      if (!createdTicket) {
        throw new Error("Ticket creation failed.");
      }

      await cartsService.deleteCart(id);

      return res.json({ message: "Compra realizada exitosamente", createdTicket });
    } catch (error) {
      throw new Error("error cart controller.");
    }
  }

  async deleteProductFromCart(req, res) {
    const { cartId, productId } = req.body;
    try {
      const cart = await cartsService.findCartById(cartId)
      console.log(cart.products);
      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }
      cart.products = cart.products.filter(product => {
        return product.id_prod._id.toString() !== productId;
      });
      const updatedCart = await cart.save();

      res.status(200).json({ message: 'Producto eliminado del carrito', cart: updatedCart });
      
    } catch (error) {
      throw new Error("Error occurred while deleting cart.");
    }
  }
}

export const cartsController = new CartsController();
