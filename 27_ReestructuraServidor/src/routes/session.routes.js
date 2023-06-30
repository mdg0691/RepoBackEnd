import { Router } from "express";
import { userModel } from "../DB/models/User.js";

const sessionRouter = Router();

// vista para registrar usuarios

sessionRouter.get('/', (req,res) => {
  res.render('partials/session/login')
})

sessionRouter.get("/register", (req, res) => {
  res.render("partials/session/register");
});

sessionRouter.get('/errorLogin',(req,res) => {
  res.render('partials/session/errorLogin')
})

sessionRouter.get('/errorRegister',(req,res) => {
  res.render('partials/session/errorRegister')
})

sessionRouter.get('/profile',(req,res) => {
  res.render('partials/session/profile')
})

export default sessionRouter;
