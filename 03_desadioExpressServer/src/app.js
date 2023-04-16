import express from 'express'
import { ProductManager } from './ProductManager.js'

const app = express()  // Inicializo express

const PORT = 4000 

const productManager = new ProductManager('./products.txt')

app.use(express.urlencoded({extended:true})) // linea necesaria para el uso de request query


// Obtengo total de producto y limite de productos con request query
app.get("/products", async (req, res) => {
    let totalProducts = req.query.qty
    if(!totalProducts){     //Obtengo todos los productos
        const products = await productManager.getProducts()
        res.send(products)
    } else{                 //Obtengo un limite de productos con params query
        const products = await productManager.getProducts()
        const limitProducts = products.filter(limit => limit.id <= parseInt(totalProducts))
        console.log(limitProducts)
        res.send(limitProducts)
    }  
})

// Obtengo id producto con requesq params
app.get("/products/:id", async (req, res) => {
    const product = await productManager.getProductById(req.params.id)
    res.send(product)
})

// puerto a utilizar
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})