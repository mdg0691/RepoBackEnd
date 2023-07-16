import { Router } from 'express'// importo solo Router desde express para manejar las rutas
import productModel from '../DB/mongoDB/models/Products.js'
import { renderProducts } from '../controllers/products.controller.js'
import { renderProductId } from '../controllers/products.controller.js'
import { deleteProduct } from '../controllers/products.controller.js'

const productRouter = Router() // voy a definir mis rutas con esta cte
//Funcion utilizada para convertir key value paras a object key value params 

productRouter.get("/:userId", renderProducts) // funcion get importada desde controllers, me trae los productos con pagination. 

productRouter.get("/:id", renderProductId )

productRouter.post("/", async (req, res) => {
    try{
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
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "An error occurred while posting products." })
    }
})

productRouter.put("/:id", async (req, res) => {  
    try{
        const id = req.params.id;
        const datosActualizados = req.body;
        const producto = await productModel.findByIdAndUpdate(id, datosActualizados, { new: true })  
        res.json("producto Actualizado")
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating products." })
    }
})


productRouter.get("/delete/:id", deleteProduct)


export default productRouter