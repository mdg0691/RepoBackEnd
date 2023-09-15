import { Router } from "express";
import { renderProducts } from "../controllers/views.controller.js";

const viewsRouter = Router();

// vista para registrar usuarios

viewsRouter.get('/', (req,res) => {
  res.render('partials/session/login')
})

viewsRouter.get("/register", (req, res) => {
  res.render("partials/session/register");
});

viewsRouter.get('/errorLogin',(req,res) => {
  res.render('partials/session/errorLogin')
})

viewsRouter.get('/errorRegister',(req,res) => {
  res.render('partials/session/errorRegister')
})

viewsRouter.get('/profile',(req,res) => {
  res.render('partials/session/profile')
})

viewsRouter.get('/forgot-password',(req,res) => {
  res.render('partials/session/forgotPassword')
})
viewsRouter.get('/reset-password/:id',(req,res) => {
  const user= req.params
  res.render('partials/session/resetPassword',{user})
})
viewsRouter.get('/products',renderProducts)
export default viewsRouter;
