import {productsModel} from '../../mongoDB/models/products.model.js'
import BasisMongo from './basicMongo.js'

class ProductsMongo extends BasisMongo{
    constructor(model){
        super(model)
    }
}
export const productsMongo = new ProductsMongo(productsModel)