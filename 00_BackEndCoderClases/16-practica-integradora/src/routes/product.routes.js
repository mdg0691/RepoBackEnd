import { Router } from 'express'// importo solo Router desde express para manejar las rutas
import productModel from '../models/Products.js'

const productRouter = Router() // voy a definir mis rutas con esta cte

productRouter.get("/", async (req, res) => {
    const products = await productModel.find()
    res.send(products)
})

productRouter.get("/:id", async (req, res) => {

    const id = (req.params.id)
    const product = await productModel.findOne({_id: `${id}` })
    const productJson = JSON.stringify(product) 
    res.send(productJson)
    
})

productRouter.post("/", async (req, res) => {
    const { title, description, code, category, price, stock } = req.body
    productModel.create([
        {
            title: title,
            description: description,
            code: code,
            category: category,
            price: price,
            stock: stock
        }
    ])
    res.send("Producto creado")
})

productRouter.put("/:id", async (req, res) => {  
      const id = req.params.id;
      const datosActualizados = req.body;
  
      const producto = await productModel.findByIdAndUpdate(id, datosActualizados, { new: true });  
      res.json("producto Actualizado");
})


productRouter.delete("/:id", async (req, res) => {
    const id = req.params.id
    const product = await productModel.deleteOne({_id : `${id}`})
    res.send("producto eliminado")
})

export default productRouter