import productModel from "../DB/models/Products.js";
// Funcion para convertir parametro a objects
export const paramsToObject = (paramsString) => {
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

export const renderProducts = async (req, res) => {
    try{
        const userId = req.params.userId
        console.log(userId)
        const limit = (req.query.limit) || 10;
        const page = (req.query.page) || 1;
        const sort = req.query.sort;
        //Filtro 
        const query = req.query.query
        const paramsObject = paramsToObject(query) // paramsToObjects importada desde product.controller       
        // get 
        // const products = await productModel.find()
        const products = await productModel.paginate(paramsObject,{limit:limit,page:page,sort:sort})
        // const products = await productModel.find().lean()
        // lean()// funcion para ordenar los documentos pero no me sirven con paginate
    
        res.render("products", { userId: userId, docs: products.docs })
        

        console.log(typeof(products))
        console.log(products)

    }catch(error){
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching products." })
    }    
}

export const renderProductId = async (req, res) => {
    try{
        const id = (req.params.id)
        const product = await productModel.find({_id: `${id}` }).lean()
        
        res.render("products", {  docs: product })
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching one product." })
    }
}

export const deleteProduct = async (req, res) => {
    try{
        const {id} = req.params
        await productModel.findByIdAndDelete(id)
        res.redirect("/products/")
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting products." })
    }
}

// console.log(renderProducts)