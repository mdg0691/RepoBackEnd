import { Router } from 'express'// importo solo Router desde express para manejar las rutas
import { ProductManager } from '../ProductManager.js'

const productManager = new ProductManager('./productos.txt')

const productRouter = Router() // voy a definir mis rutas con esta cte

productRouter.get("/", async (req, res) => {
    const products = await productManager.getProducts()
    res.send(products)
})

productRouter.get("/:id", async (req, res) => {
    const product = await productManager.getProductById(req.params.id)
    res.send(product)
})

productRouter.post("/", async (req, res) => {
    try{
        const { title, description, code, price,status,stock,category,thumbnail } = req.body
        if(!title || !description ||!code ||!price ||!stock ||!category){
            res.status(403)
            res.send({ error: 'Todos los campos son obligatorios'})
        }
        await productManager.addProduct({ title, description, code, price,status,stock,category,thumbnail })
        res.send("Producto creado")
    }catch(error){
        return error
    }
    
})

productRouter.put("/:id", async (req, res) => {
    const id = req.params.id
    const { title, description, code, price,status,stock,category,thumbnail } = req.body

    const mensaje = await productManager.updateProduct(id, { title, description, code, price,status,stock,category,thumbnail })

    res.send(mensaje)
})

productRouter.delete("/:id", async (req, res) => {
    const id = req.params.id
    const mensaje = await productManager.deleteProduct(id)
    res.send(mensaje)
})

export default productRouter