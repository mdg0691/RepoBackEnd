import { Schema, model } from "mongoose"

//Genero mi modelo de mensaje con sus atributos para enviar mensajes
const messageSchema = new Schema({
    user: {
        type:String,
        required: true
    },
    message: {
        type:String,
        required: true
    }
})

 
export const messageModel = model("messages", messageSchema)