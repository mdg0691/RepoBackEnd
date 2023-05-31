import { Router } from "express";
import cartModel from "../models/Cart.js";
import productModel from "../models/Products.js";
import { Types } from 'mongoose';

const cartRouter = Router()

cartRouter.get("/", async (req, res) => {
    try{
        const cartProducts = await cartModel.find()
        // res.send(products)
        res.render("cart", {docs: cartProducts})
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

cartRouter.get("/addToCart/:id", async (req, res) => {
    try{
        const { _id } = req.body
        
        const objectId = new Types.ObjectId(_id);
        const newProduct = {
            id_prod: objectId,
            cantidad: 2
        }

        const cartProduct = new cartModel({
            newProduct
        })
        cartProduct.save()
        // cartModel.push(newProduct)
        // cartProduct = await cartModel.save({products : {newProduct}})
        // const cartProduct = await cartModel.create({products : [newProduct]})
        res.render("cart",{docs:cartProduct})
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