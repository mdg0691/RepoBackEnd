import Role from "../DAL/mongoDB/models/role.model.js";
import { authJwt } from "../middlewares/index.js";
import { usersService } from "../services/users.service.js";
import { compereData, hashData } from "../utils/bcryp.js";
import { trasporter } from "../utils/nodemailer.js";
import config from "../config/config.js";

const JWT_COOKIE=config.jwt_cookie
export const signUp = async (req, res) => {
  console.log(req.body);
  const { first_name, last_name, email, password,roles } = req.body;
  const newUser = {
    first_name:first_name,
    last_name:last_name,
    email:email,
    password:password
  }

  if (!first_name || !last_name || !email || !password) {
    return res.status(401).json({ message: "Some data is missing" });
  }
  const checkUser = await usersService.findOneUser(email);
  if (checkUser) {
    return res.status(401).json(["User already created"]);
  }
  if(roles){
    
    const foundRoles = await Role.find({name: {$in:roles}})
    newUser.roles = foundRoles.map(role => role._id) 
    
  } else {
    const role= await Role.findOne({name:"user"})
    newUser.roles = [role._id]
  }
  try {
    const savedUser = await usersService.createOneUser(newUser);
    //creo token con jwt
    const token = authJwt.generateToken(savedUser)
    res.cookie(JWT_COOKIE,token,{maxAge:60*1000,httpOnly:true})// Set the cookie
    res.status(200).json({ message: "Usuario creado", user: savedUser, token });
    // res.status(200).send("usuario creado",savedUser)

    } catch (error) {
    res.status(500).json({ message: "Error controller", error });
  }
};

export const signIn = async (req, res) => {
  
  try {
    const {email,password} = req.body  
    const userFound = await usersService.findOneUser(email)
    console.log(userFound);
    if(!userFound) return res.status(401).json({message:["Usser no found"]});
    const matchPassword = await compereData(password,userFound.password)
    if(!matchPassword) return res.status(401).json({message:["Password Invalid"]});  
    const token = authJwt.generateToken(userFound)
    res.cookie(JWT_COOKIE,token,{
      maxAge:60*1000,httpOnly:true,
      sameSite:'none',
      secure:true
    })// Set the cookie
    res.status(200).json({message:['Login Sucessfull'],token,userFound})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
  
};

export const logout = async (req,res) =>{
  const cookies = req.cookies
  console.log(cookies);
  if(!cookies) return res.sendStatus(204)
  res.clearCookie(JWT_COOKIE,{httpOnly:true,sameSite:'none',secure:true})
  res.status(200).json({message:'cookie removed'})
}

export const refreshToken = async(req,res) => {
  const cookies = req.cookies
  if(!cookies) return res.status(401).json({message:'Unauthorized'})
  const refreshToken = cookies.jwt
  authJwt.authToken(refreshToken)
}

export const forgotPassword = async (req, res) => {
  const {email} = req.body
  const userFound = await usersService.findOneUser(email)
  if(!userFound) return res.status(400).json({message: "User not registered"})
  //user exist and now create a One time valid link valid for 15 minutes
  const token = authJwt.generateToken(userFound)
  console.log(token)
  const link = `Hola ${userFound.email} Para reeestablecer la contraseña haz clic en el siguiente link
    http://localhost:8080/api/auth/reset-password/${userFound.id}/${token}`
  try {
    await trasporter.sendMail({
        to:userFound.email,
        subject:"RECUPERAR PASSWORD",
        text: link
    })
    res.status(200).json('Mail Sent')
} catch (error) {
    res.status(500).json({message:error})
}
};

export const resetPassword = async( req, res) => {
  const userId = req.params.id
  //check if this id exist in data base
  const userFound = await usersService.findOneById(userId)
  if(!userFound.id) return res.status(400).json({message: "User not found"})
  res.redirect(`http://localhost:8080/api/views/reset-password/${userId}`)
  // res.render('partials/session/resetPassword',userId)
}

export const updatedPassword = async(req,res) => {
  const{id} = req.params
  const{password}= req.body
  const hashPassword = await hashData(password)
  const findUser= await usersService.findOneById(id)
  findUser.password=hashPassword
  const userUpdated = await usersService.findOneAndUpdate(id,findUser)
  res.status(200).json({message:'password updated',userUpdated})
}