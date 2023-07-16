import mongoose from "mongoose"

const OrdersSchema = new mongoose.Schema({
    order_number: {
        type: Number,
        required: true
    },
    bussines: {
        type: mongoose.SchemaType.ObjectId,
        ref: 'Business'
    },
    user: {
        type: mongoose.SchemaType.ObjectId,
        ref: 'Users'
    },
    products:[
        {
        type: mongoose.SchemaType.ObjectId,
        ref: 'Products'
        },
    ],
    price: {
        type: Number,
        required: true
    }
})

export const ordersModel = mongoose.model('Orders', OrdersSchema)