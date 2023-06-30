import { Router } from "express";
import { loginUsers, registerUser } from "../controllers/users.controller.js";
import passport from "passport";
const userRouter = Router();

userRouter.post("/register", registerUser);
//login sin passport
// userRouter.post("/login", loginUsers);

// login con passport
userRouter.post("/login",

  passport.authenticate("login", {
    failureRedirect: "/api/session/errorLogin",
    successRedirect: "/api/session/profile",
  })
);

userRouter.get("/githubSignup",
  passport.authenticate("githubSignup", { scope: ["user:email"] })
);

userRouter.get('/github', 
  passport.authenticate('githubSignup', { failureRedirect: '/api/session' }),
  function(req, res) {
    // console.log(req)
    const user = req.body
    // Successful authentication, redirect home.
    res.redirect("/api/session/profile")
  });
export default userRouter;

