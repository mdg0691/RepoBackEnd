import { ticketService } from "../services/tickets.service.js"

class TicketController {
    async findAllTickets(req,res){
        try{
            const allTickets = await ticketService.findAllTickets()
            res.status(200).json({message:'All Tickets',allTickets})
        }catch(error){
            res.status(500).json({message: 'Error',error})
        }
    }
    async findOneTicket(req,res){
        const {id} = req.params
        try{
            const ticket = await ticketService.findOneTicket(id)
            res.status(200).json({message:'Ticket',ticket})
        }catch(error){
            res.status(500).json({message: 'Error',error})
        }
    }
    async createOneTicket(req,res){
        const {code,amount,user}=req.body
        if(!code||!amount||!user){
            res.status(401).json({message:'Some data is missing'})
        }
        try{
            const newTicket = await ticketService.createTicket(req.body)
            res.status(200).json({message:'Ticket Created', ticket:newTicket})
        }catch(error){
            res.status(500).json({message: 'Error',error})
        }
    }
    async deleteOne(req,res){
        const {id} = req.params
        try{
            const user = await ticketService.deleteTicket(id)
            res.status(200).json({message:'Ticket Deleted',user})
        }catch(error){
            res.status(500).json({message: 'Error',error})
        }
    }
}

export const ticketsController = new TicketController()