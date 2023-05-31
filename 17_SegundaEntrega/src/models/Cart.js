import { Schema, model } from "mongoose"

//Genero mi modelo de carrito el cual en si , atributos tendra solo uno 
//que es un array y cantidad siguiendo la teoria, pero en esta caso lo generamos de una 
//manera particular
const cartSchema = new Schema({
    products: {
        type: [
            {
//basicamente lo que se hace aqui es generar la referencia a mi producto en la base de datos
//sin este tipo de modelo no puedo generar esa ref                
                id_prod:{ 
                    type: Schema.Types.ObjectId,
                    ref: "products"
                },
                cantidad:{
                    type:Number,
                    default : 1}
            }
        ],
        default: []//cada vez q creo un nuevo cart el valor de carrito sera vacio
    }
})

// utilizo midlewere para anticipar la busqueda y obtener la referencia del id product 
cartSchema.pre('find',function(){
    this.populate('products.id_prod')
})
const cartModel = model("carts", cartSchema )
// exporto para crear nuevos carritos, 
export default cartModel