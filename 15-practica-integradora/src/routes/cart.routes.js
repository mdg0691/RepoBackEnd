import { Router } from "express";
import cartModel from "../models/Cart.js";

const cartRouter = Router()

cartRouter.get("/", async (req, res) => {
    const products = await cartModel.find()
    res.send(products)
})

cartRouter.get("/:id", async (req, res) => {

    const id = (req.params.id)
    const product = await cartModel.findOne({_id: `${id}` })
    const productJson = JSON.stringify(product) 
    res.send(productJson)
    
})

cartRouter.post("/", async (req, res) => {
    const { id_prod, cantidad } = req.body
    
    const newProduct = {
        id_prod: id_prod,
        cantidad: cantidad,
    }
    // const cart = await cartModel.create({products : [newProduct]})
    const cart = await cartModel.findOneAndUpdate({}, { $push: { products: newProduct } }, { new: true, upsert: true });
    res.send("carrito creado")
})

cartRouter.delete("/:id", async (req, res) => {
    const id = req.params.id
    const product = await cartModel.deleteOne({_id : `${id}`})
    res.send("producto eliminado")
})

export default cartRouter