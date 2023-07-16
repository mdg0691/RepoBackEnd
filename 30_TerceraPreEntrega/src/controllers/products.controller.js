import { productsService } from '../services/products.service.js'

class ProductsController{
    async findAllProducts(req,res){
        try{
            const allProducts = await productsService.findAllProducts()
            res.status(200).json({message:'Products', allProducts})
        }catch(error){
            res.status(500).json({message:'Error',error})
        }
    }
    async findOneProduct(req,res){
        const {idProduct}= req.params
        try{
            const response = await productsService.findOneProducts(idProduct)
        }catch(error){
            res.status(500).json({message:'Error',error})
        }
    }
    async createOneProduct(req,res){
        const {name,price,stock}=req.body
        if(!name||!price||!stock){
            res.status(501).json({message:'Some data is missing'})
        }
        try{
            const newProduct = await productsService.createOneProduct(req.body)
            res.status(200).json({message:'Product Created',newProduct})
        }catch(error){
            res.status(500).json({message:'Error',error})
        }
    }

    async deleteProduct(req,res){
        const {idProduct}= req.params
        try{
            const product = await productsService.deleteOneProduct(idProduct)
            res.status(200).json({message:'Product deleted',product})
        }catch(error){
            res.status(500).json({message:'Error',error})
        }
    }
}

export const productController = new ProductsController()