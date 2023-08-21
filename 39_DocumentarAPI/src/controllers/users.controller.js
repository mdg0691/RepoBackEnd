import { usersService } from "../services/users.service.js";

class UserController {
    async findAllUsers(req,res){
        try{
            const allUsers = await usersService.findAllUsers()
            res.status(200).json({message:'Users',allUsers})
        }catch(error){
            res.status(500).json({message: 'Error',error})
        }
    }
    async findOneUser(req,res){
        const {idUser} = req.params
        try{
            const user = await usersService.findOneUser(idUser)
            res.status(200).json({message:'User',user})
        }catch(error){
            res.status(500).json({message: 'Error',error})
        }
    }
    async createOneUser(req,res){
        const {first_name,last_name,email,password}=req.body
        if(!first_name||!last_name||!email||!password){
            res.status(401).json({message:'Some data is missing'})
        }
        try{
            const newUser = await usersService.createOneUser(req.body)
            res.status(200).json({message:'User Created', user:newUser})
        }catch(error){
            res.status(500).json({message: 'Error',error})
        }
    }
    async deleteOne(req,res){
        const {idUser} = req.params
        try{
            const user = await usersService.deleteOneUser(idUser)
            res.status(200).json({message:'User Deleted',user})
        }catch(error){
            res.status(500).json({message: 'Error',error})
        }
    }
    async deleteAll(req,res){
        try{
            await usersService.deleteAll()
            res.status(200).json({message:'Users Deleted'})
        }catch(error){
            res.status(500).json({message: 'Error controller',error})
        }
    }
}

export const usersController = new UserController()