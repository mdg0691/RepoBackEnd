import { Router } from 'express'
import { CartManager } from '../CartManager.js'

const cartManager = new CartManager('./carrito.txt')
const cartRouter = Router()

cartRouter.post("/", async (req, res) => {
    const cart = await cartManager.createCart()
    res.send(cart)
})
cartRouter.get('/',async(req,res)=>{
    const getCart = await cartManager.getCart()
    res.send(getCart)
})
cartRouter.get('/:id',async(req,res)=>{
    const getCartById = await cartManager.getCartById(req.params.id)
    res.send(getCartById)
})

cartRouter.post("/:id", async (req, res) => {
    const idCart = req.params.id
    const { id, title, quantity } = req.body

    const mensaje = await cartManager.addProductCart(idCart, { id, title, quantity })

    res.send(mensaje)
})
export default cartRouter