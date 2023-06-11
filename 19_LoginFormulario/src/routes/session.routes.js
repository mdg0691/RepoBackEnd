import { Router } from "express";
import { userModel } from "../models/User.js";

const sessionRouter = Router()

// vista para registrar usuarios

sessionRouter.get("/register", (req,res)=>{
    res.render('partials/session/register')
})

sessionRouter.post('/register', async (req,res) => {
    const userNew = req.body
    const user = new userModel(userNew)
    console.log(user)
    await user.save()
    res.redirect('/session/login')
})

// vista login

sessionRouter.get('/login', (req,res) => {
    res.render('partials/session/login')
})

sessionRouter.post('/login', async(req,res) => {
    const {email,password} = req.body
    console.log(email)
    const user = await userModel.findOne({email,password}).lean()
    console.log(user.email)
    if (!user){
        return res.status(401).render('/errors/base',{
            error:'Error en emaily/o contraseña'
        }
        )}
        else {
            // res.send(`usuario: ${user.email} Logueado`)
            res.redirect(`/products/${user._id}`)
        }
})

sessionRouter.get('/logout', (req,res) => {
    res.session.destroy(err => {
        if(err) res.status(500).render('errors/base',{
            error: err
        })
        else res.redirect('partials/session/login')
    })
})

export default sessionRouter 