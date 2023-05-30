import { Router } from 'express'// importo solo Router desde express para manejar las rutas
import productModel from '../models/Products.js'
// import { renderProds } from '../controllers/productsController'
// import { paramsToObject } from '../controllers/productsController'

const productRouter = Router() // voy a definir mis rutas con esta cte
//Funcion utilizada para convertir key value paras a object key value params 

// productRouter.get("/", renderProds )  
const paramsToObject = (paramsString) => {
            try{
                const params = new URLSearchParams(paramsString);
                const obj = {};
                for (const [key, value] of params) {
                obj[key] = value;
                }
                return obj;
            }catch(error){
                console.error(error);
                throw new Error("Error occurred while converting params to object.");
            }
          }
productRouter.get("/", async (req, res) => {
    try{
        const limit = (req.query.limit) || 10;
        const page = (req.query.page) || 1;
        const sort = req.query.sort
        const query = req.query.query
        
        const paramsObject = paramsToObject(query)        
        // get 
        
        const products = await productModel.paginate(paramsObject,{ limit:limit,page:page,sort:sort})//.lean()
        
        // const products = await productModel.find().lean()
        // lean()// funcion para ordenar los documentos pero no me sirven con paginate
    
        res.render("products", {  docs: products.docs })

        // console.log(typeof(products))
        // console.log(products)

    }catch(error){
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching products." })
    }    
} )

productRouter.get("/:id", async (req, res) => {
    try{
        const id = (req.params.id)
        const product = await productModel.findOne({_id: `${id}` })
        const productJson = JSON.stringify(product) 
        res.send(productJson)
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching one product." })
    }
})

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


productRouter.delete("/:id", async (req, res) => {
    try{
        const id = req.params.id
        await productModel.deleteOne({_id : `${id}`})
        res.send("producto eliminado")
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting products." })
    }
})


export default productRouter