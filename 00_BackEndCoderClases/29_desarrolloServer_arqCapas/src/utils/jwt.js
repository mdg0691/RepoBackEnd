import jwt from "jsonwebtoken"
import config from '../config/config.js'

const PRIVATE_KEY = config.private_key 

export const generateToken = (user) =>{
    const token = jwt.sign({user}, PRIVATE_KEY,{expiresIn:86400})//86400 = 24hs
    
    return token
}

export const authToken = (req,res,next) => {
    const authHeader = req.headers["x-access-token"]
    if(!authHeader){
        return res.status(401).json({message:"no aunthenticated"})
    }
    try {
        const token = authHeader.split(' ')[1]//se hace split para retirar la palabra bearer
        jwt.verify(token,PRIVATE_KEY,(error,credentials) =>{
            if(error){
                return res.status(403).json({message:"Not authorazed"})
            }
            req.user = credentials.user;
            next()
        })
    } catch (error) {
        
    }
}