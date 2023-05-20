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
                cant: Number
            }
        ],
        default: []//cada vez q creo un nuevo cart el valor de carrito sera vacio
    }
})
const cartModel = model("carts", cartSchema )
// exporto para crear nuevos carritos, 
export default cartModel