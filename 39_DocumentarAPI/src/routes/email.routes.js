import { Router } from "express";
import { trasporter } from "../utils/nodemailer.js";

const router= Router()

router.get('/', async(req,res) =>{
    try {
        await trasporter.sendMail({
            to:'celylft@gmail.com',
            subject:"GANASTE 1000000 DE DOLARES",
            text:"Celina nos comunicamos por este medio para informarte que saliste ganadora de 1 millon de dolares, para cobrarlos haz click en el siguiente link"

        })
        res.status(200).json('Mail Sent')
    } catch (error) {
        res.status(500).json({message:error})
    }
})


export default router