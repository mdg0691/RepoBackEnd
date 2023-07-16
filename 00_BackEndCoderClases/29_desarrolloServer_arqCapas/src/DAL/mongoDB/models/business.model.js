import mongoose, { Mongoose } from "mongoose"

const businessSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    products: [
        {
            type: mongoose.SchemaType.ObjectId,
            ref: 'Products'
        },
    ],
})

export const bussinesModel = mongoose.model('Business', businessSchema)