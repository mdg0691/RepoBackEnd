import { productController } from "./products.controller.js"

export const  renderProducts = async (req,res) =>{
     const products = await productController.findAllProducts(req,res)
    // console.log(products);
    res.render('products',products)
}