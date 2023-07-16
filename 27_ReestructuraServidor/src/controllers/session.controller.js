import { findById, createOne } from "../services/user.services.js";
import passport from "passport";

// import { hashData, compereData } from "../utils/bcrypt.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const id = email;
    const user = await findById(id); // reemplazo id por email
    console.log(user);
    if (user) {
      return res.redirect("/api/session/errorRegister");
    }

    const newUser = createOne(req.body);
    res.redirect("/api/views/profile");
  } catch (error) {
    return next(error);
  }
};

export const loginUsers = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await findById(email);
    if (!user) {
      return res.redirect("/api/session/errorLogin");
    }
    const isPasswordValid = await compereData(password, user.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      return res.redirect("/api/session/errorLogin");
    }

    res.redirect("/api/session/profile");
    // res.redirect("/api/");
  } catch (error) {
    console.log(error);
  }
};

export const loginPassport = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await findById(email);
    if (!user) {
      return res.redirect("/api/session/errorLogin");
    }
    passport.authenticate("login", {
      failureRedirect: "/api/views/errorLogin",
      successRedirect: "/api/views/profile",
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginGithub = async (req, res) => {
  try {
    console.log('session route')
    passport.authenticate("githubSignup", { scope: ["user:email"] });
  } catch (error) {
    console.log(error);
  }
};

export const githubRedirect = async (req, res) => {
  try {
    passport.authenticate("githubSignup", { failureRedirect: "/api/views" }),
      function (req, res) {
        // console.log(req)
        const user = req.body;
        // Successful authentication, redirect home.
        res.redirect("/api/views/profile");
      };
  } catch (error) {
    console.log(error);
  }
};
