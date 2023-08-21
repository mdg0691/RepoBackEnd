import { Router } from "express";
import * as authCtrl from '../controllers/auth.controller.js'
import passport from "passport";
const authRouter = Router();

// authRouter.post("/singup", authCtrl.signUp);
// authRouter.post("/singin", authCtrl.signIn);
//Passport

authRouter.post("/singin", passport.authenticate('login'),authCtrl.signIn);

//googlepasssport
authRouter.get("/googleSignup", passport.authenticate("googleSignup", { scope: ['profile'] }));

authRouter.get("/google",passport.authenticate('googleSignup',{ failureRedirect: '/errorLogin' }),
function(req,res){
    // console.log(req)
    const user = req.body
    // Successful authentication, redirect home.
    res.redirect("/profile")
} ) 

//gitHub

authRouter.get("/githubSignup",
passport.authenticate("githubSignup", { scope: ["user:email"] })
);

authRouter.get('/github', 
passport.authenticate('githubSignup', { failureRedirect: '/' }),
function(req, res) {
  // console.log(req)
  const user = req.body
  // Successful authentication, redirect home.
  res.redirect("/profile")
});
export default authRouter; 
