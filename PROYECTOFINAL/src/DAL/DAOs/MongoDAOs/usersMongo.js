import {usersModel} from '../../mongoDB/models/users.model.js'
import BasisMongo from './basicMongo.js'

class UsersMongo extends BasisMongo{
    constructor(model){
        super(model)
    }
}
export const usersMongo = new UsersMongo(usersModel)