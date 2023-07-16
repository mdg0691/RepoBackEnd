import { Router } from "express";
import cartModel from "../DB/mongoDB/models/Cart.js";
import mongoose from "mongoose";

const cartRouter = Router()

cartRouter.get("/", async (req, res) => {
    try{
        const products = await cartModel.find()
        res.render("cart", { docs: products })
        // res.send(products)
    }catch(error){
        console.error(error);
        throw new Error("Error occurred while getting carts.");
    }
    
})
  
cartRouter.get("/:userId/addToCart/:productId", async (req, res) => {
    try {
        const { productId, userId } = req.params;

        const cart = await cartModel.findOne({ userId });
        console.log("consulto cart")
        console.log(cart);
        if (cart) {
            // Si el carrito existe, agregar el producto al campo 'products'
            cart.products.push({ id_prod: new mongoose.Types.ObjectId(productId), cantidad: 1 });
            await cart.save();
            res.render("cart", { docs: cart.products })
            res.send("carrito actualizado")
        } else {
            // Si el carrito no existe, crear uno nuevo y agregar el producto
            let nuevo_carrito = await new cartModel.create({ 
                userId: new Types.ObjectId(userId),
                productId:new Types.ObjectId(productId),
                quantity: 1
             });
            res.redirect(`/cart`)
            res.send("carrito nuevo creado");
        }
        
    } catch (error) {
        console.error(error);
        throw new Error("Error occurred while posting cart.");    
    }
});




///////////////
cartRouter.get("/:id", async (req, res) => {
    try{
        const id = (req.params.id)
        const product = await cartModel.findOne({_id: `${id}` })
        const productJson = JSON.stringify(product) 
        res.send(productJson)
    }catch(error){
        console.error(error);
        throw new Error("Error occurred while getting id.");
    }
    
    
})

cartRouter.delete("/:id", async (req, res) => {
        try{
            const id = req.params.id
            const product = await cartModel.deleteOne({_id : `${id}`})
            res.send("producto eliminado")
        }catch(error){
            console.error(error);
            throw new Error("Error occurred while deleting cart.");
        }
    
})

export default cartRouter