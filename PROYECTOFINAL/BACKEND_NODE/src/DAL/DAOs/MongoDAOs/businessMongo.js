import {bussinesModel} from '../../mongoDB/models/business.model.js'
import BasisMongo from './basicMongo.js'

class BussinesMongo extends BasisMongo{
    contructor(model){
        super(model)
    }
}

export const BussinesMongo = new BussinesMongo(bussinesModel) 