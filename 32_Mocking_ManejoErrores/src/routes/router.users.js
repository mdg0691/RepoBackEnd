import { Router } from "express"
import CustomError from "../services/errors/CustomError.js"
import EErrors from "../services/errors/enums.js"
import { generateUserErrorInfo } from "../services/errors/info.js"

const users = []

const userRouter = Router()

userRouter.get('/', (req,res) => {
    res.send({status:"succes", payload:users})
})
userRouter.post('/', (req,res) => {
    const {first_name,last_name,email}= req.body
    console.log(req.body);
    if (!first_name || !last_name || !email) {
        CustomError.createError({
            name:"user creation error",
            cause:generateUserErrorInfo({first_name,last_name,email}),
            message:"Error trying to create User",
            code: EErrors.INVALID_TYPES_ERROR
        })
    }
    const user = {
        first_name,
        last_name,
        email
    }
    if(users.length===0){
        user.id=1
    }else{
        user.id=users[users.length-1].id+1
    }
    users.push(user)
    res.send({status:"succes", payload:users})
})

export default userRouter