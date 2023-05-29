import { Router } from "express";
import cartModel from "../models/Cart.js";

const cartRouter = Router()

cartRouter.get("/", async (req, res) => {
    try{
        const products = await cartModel.find()
        res.send(products)
    }catch(error){
        console.error(error);
        throw new Error("Error occurred while getting carts.");
    }
    
})

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

cartRouter.post("/", async (req, res) => {
    try{
        const { id_prod, cantidad } = req.body
    
        const newProduct = {
            id_prod: id_prod,
            cantidad: cantidad,
        }
        const cart = await cartModel.create({products : [newProduct]})
        res.send("carrito creado")
    }catch(error){
        console.error(error);
        throw new Error("Error occurred while posting cart.");    
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