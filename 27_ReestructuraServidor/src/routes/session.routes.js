import { Router } from "express";
import { githubRedirect, loginGithub, loginPassport, registerUser } from "../controllers/session.controller.js";

const sessionRouter = Router();

sessionRouter.post("/register", registerUser);
//login sin passport
// sessionRouter.post("/login", loginUsers);

// login con passport
sessionRouter.post("/login",loginPassport);

sessionRouter.get("/githubSignup",loginGithub);


sessionRouter.get('/github', githubRedirect);
export default sessionRouter;
