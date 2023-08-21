import { userModel } from "../models/User.js";
import { hashData, compereData } from "../utils/bcrypt.js";

export const registerUser = async (req,res, next) =>{
        try {
        const { email, password } = req.body;
      
        const user = await userModel.findOne({email})
        console.log(user)
        if(user){
            return res.redirect('/api/session/errorRegister')
        }
        const hashPassword = await hashData(password)
        const newUser = new userModel({...req.body, password:hashPassword})
        // console.log(newUser)
        await newUser.save()
        res.redirect("/api/session");
    }
    catch(error){
        return next(error)
    }
}

export const loginUsers = async (req,res) => {
        try{
        const { email, password } = req.body;
        const user = await userModel.findOne({email})
        if(!user){
            return res.redirect('/api/session/errorLogin')
        }
        const isPasswordValid = await compereData(password, user.password)
        console.log(isPasswordValid)
        if(!isPasswordValid){
            return res.redirect('/api/session/errorLogin')
        }

        res.redirect("/api/session/profile")
        // res.redirect("/api/");
    }
    catch(error){
        console.log(error)
    }
}