// import productModel from "../models/Products";

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
// export const renderProds = async (req, res) => {
//     try{
//         const limit = (req.query.limit) || 10;
//         const page = (req.query.page) || 1;
//         const sort = req.query.sort
//         const query = req.query.query
//         const paramsObject = paramsToObject(query)        
//         // get 
        
//         const products = await productModel.paginate(paramsObject,{ limit:limit,page:page,sort:sort})//.lean()
        
//         // const products = await productModel.find().lean()
//         // lean()// funcion para ordenar los documentos pero no me sirven con paginate
    
//         res.render("products", {  docs: products.docs })

//         // console.log(typeof(products))
//         // console.log(products)

//     }catch(error){
//         console.error(error);
//         res.status(500).json({ error: "An error occurred while fetching products." })
//     }    
// }

