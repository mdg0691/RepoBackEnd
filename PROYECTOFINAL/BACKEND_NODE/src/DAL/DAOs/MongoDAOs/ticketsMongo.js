import {ticketModel} from '../../mongoDB/models/tickets.model.js'
import BasisMongo from './basicMongo.js'

class TicketModel extends BasisMongo{
    constructor(model){
        super(model)
    }
}

export const ticketsMongo = new TicketModel(ticketModel)