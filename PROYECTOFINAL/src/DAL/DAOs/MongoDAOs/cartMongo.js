import {cartModel} from '../../mongoDB/models/carts.model.js'
import BasisMongo from './basicMongo.js'

class CartMongo extends BasisMongo{
    constructor(model){
        super(model)
    }
}
export const cartsMongo = new CartMongo(cartModel)