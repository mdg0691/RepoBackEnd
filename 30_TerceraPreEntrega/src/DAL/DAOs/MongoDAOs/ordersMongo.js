import {ordersModel} from '../../mongoDB/models/order.model.js'
import BasisMongo from './basicMongo.js'

class OrdersMongo extends BasisMongo{
    contructor(model){
        super(model)
    }
}

export const ordersMongo = new OrdersMongo(ordersModel)