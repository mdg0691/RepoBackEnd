import { Router } from "express";
import { generateProducts } from "../utils/utils.js";


const routerProductsFaker = Router()

routerProductsFaker.get('/', async (req,res)=>{
    const products=[]
    for(let i=0; i<100;i++){
        products.push(generateProducts())
    }
    res.json({message:'la creacion de productos fue exitosa',products})
})

export default routerProductsFaker