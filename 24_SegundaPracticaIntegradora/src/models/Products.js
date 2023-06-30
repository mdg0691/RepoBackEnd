import { Schema, model } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
//Genero mi modelo de productos con sus atributos title, description,code...
const productSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    code: {
        type:String, 
        required: true
    },
    category: {
        type:String,
        required: true
    },
    price: {
        type:Number,
        required: true
    },
    stock: {
        type:Number,
        required: true
    },
    status: {//por defecto true , ya q el usuario al crear por defecto viene la creacion
        type:Boolean,
        default: true
    },
    thumbnail:[]
})
productSchema.plugin(mongoosePaginate)
const productModel = model("products" ,productSchema)
export  default productModel