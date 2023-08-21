import { Router } from "express";

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

export default viewsRouter;
