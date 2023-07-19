import { messagesService } from '../services/messages.service.js'

class MessagesController{
    async findAllMessages(req,res){
        try{
            const allMessages = await messagesService.findAllMessages()
            res.status(200).json({message:'Mensajes', allMessages})
        }catch(error){
            res.status(500).json({message:'Error',error})
        }
    }
    async findOneMessage(req,res){
        const {idMessage}= req.params
        try{
            const response = await messagesService.findOneMessage(idMessage)
            res.status(200).json({message:'Mensaje', response})
        }catch(error){
            res.status(500).json({message:'Error',error})
        }
    }
    async createOneMessages(req,res){
        const {message,user}=req.body
        if(!message||!user){
            res.status(501).json({message:'Some data is missing'})
        }
        try{
            const newMessage = await messagesService.createOneMessage(req.body)
            res.status(200).json({message:'Message Created',newMessage})
        }catch(error){
            res.status(500).json({message:'Error',error})
        }
    }

    async deleteMessage(req,res){
        const {idMessage}= req.params
        try{
            const message = await messagesService.deleteMessage(idMessage)
            res.status(200).json({message:'Message deleted',message})
        }catch(error){
            res.status(500).json({message:'Error',error})
        }
    }
}

export const messageController = new MessagesController()