import { config } from "dotenv";
import { authToken } from "../utils/jwt";

export const verifyToken = async(req,res,next) => {
    const token = req.headers["x-access-token"]
    console.log(token);
    if(!token) return res.status(403).json({message:"no token provided"})

    const decode = authToken(token,)
    next()
}