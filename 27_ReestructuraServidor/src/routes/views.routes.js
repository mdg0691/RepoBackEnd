import { Router } from "express";
import { userModel } from "../DB/mongoDB/models/User.js";

const viewsRouter = Router();

// vista para registrar usuarios

viewsRouter.get('/', (req,res) => {
  res.render('login')
})

viewsRouter.get("/register", (req, res) => {
  res.render("register");
});

viewsRouter.get('/errorLogin',(req,res) => {
  res.render('errorLogin')
})

viewsRouter.get('/errorRegister',(req,res) => {
  res.render('errorRegister')
})

viewsRouter.get('/profile',(req,res) => {
  res.render('profile')
})

export default viewsRouter;
