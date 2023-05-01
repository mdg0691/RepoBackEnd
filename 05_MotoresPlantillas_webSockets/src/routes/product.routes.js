import { Router } from 'express'// importo solo Router desde express para manejar las rutas
import { ProductManager } from '../ProductManager.js'

// export default (io) => {
//     io.on('conection', () => {
//         console.log("new user conected")
//     })
// }
const ProductMana = new ProductManager('./productos.txt')

const productRouter = Router() // voy a definir mis rutas con esta cte

productRouter.get("/", async (req, res) => {
    const products = await ProductMana.getProducts()
    res.send(products)
})

productRouter.get("/realtimeproducts", async (req, res) => {
    const products = await ProductMana.getProducts()
    res.render("realtimeproducts",{products})
})

productRouter.get("/:id", async (req, res) => {
    const product = await ProductMana.getProductById(req.params.id)
    res.render('product', {
        title: product.title,
        description: product.description,
        price: product.price,
        code: product.code,
        stock: product.stock
    })
})

productRouter.post("/", async (req, res) => {
    
    // io.on('connection', async (socket)  => {

    //     console.log('Cliente conectado 3');

    //     const products = await pm.getProducts()
    //     io.emit("mensaje", 'hola')
    // })
    const { title, description, price, thumbnail, code, stock } = req.body
    await ProductMana.addProduct({ title, description, price, thumbnail, code, stock })
    
    res.send("Producto creado")
})

productRouter.put("/:id", async (req, res) => {
    const id = req.params.id
    const { title, description, price, thumbnail, code, stock } = req.body

    const mensaje = await ProductMana.updateProduct(id, { title, description, price, thumbnail, code, stock })

    res.send(mensaje)
})

productRouter.delete("/:id", async (req, res) => {
    const id = req.params.id
    const mensaje = await ProductMana.deleteProduct(id)
    res.send(mensaje)
})

export default productRouter