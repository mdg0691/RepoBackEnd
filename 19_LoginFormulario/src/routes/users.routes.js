import { Router } from 'express'
import { userModel } from '../models/User.js';
import { loginUsers, registerUser } from '../controllers/users.controller.js';
const userRouter = Router()

userRouter.post('/register', registerUser)

userRouter.post('/login', loginUsers)


export default userRouter

// sessionRouter.post("/register", async (req, res) => {
//     const userNew = req.body;
//     const user = new userModel(userNew);
//     console.log(user);
//     await user.save();
//     res.redirect("/session/login");
//   });
  


// sessionRouter.post("/login", async (req, res) => {
  
//     const {email, password} = req.body
//     const user = users.find ((u) => u.email = email)
//     if(user){
//         return res.redirect('/api/session/errorRegister')
//     }
// });

// console.log(email);
//   const user = await userModel.findOne({ email, password }).lean();
//   console.log(user.email);
//   if (!user) {
//     return res.status(401).render("/errors/base", {
//       error: "Error en emaily/o contraseña",
//     });
//   } else {
//     // res.send(`usuario: ${user.email} Logueado`)
//     res.redirect(`/products/${user._id}`);
//   }