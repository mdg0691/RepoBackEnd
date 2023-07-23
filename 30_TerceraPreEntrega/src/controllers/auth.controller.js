import Role from "../DAL/mongoDB/models/role.model.js";
import { usersModel } from "../DAL/mongoDB/models/users.model.js";
import { authJwt } from "../middlewares/index.js";
import { usersService } from "../services/users.service.js";
import { compereData } from "../utils/bcryp.js";
export const signUp = async (req, res) => {
  const { first_name, last_name, email, password,roles } = req.body;
  const newUser = {
    first_name:first_name,
    last_name:last_name,
    email:email,
    password:password
  }

  if (!first_name || !last_name || !email || !password) {
    res.status(401).json({ message: "Some data is missing" });
  }
  // const checkUser = await usersService.findOneUser(email);
  // if (checkUser) {
  //   res.status(401).json({ message: "user alrady created", checkUser });
  // }
  if(roles){
    
    const foundRoles = await Role.find({name: {$in:roles}})
    newUser.roles = foundRoles.map(role => role._id) 
    
  } else {
    const role= await Role.findOne({name:"user"})
    newUser.roles = [role._id]
  }
  try {
    
    const savedUser = await usersService.createOneUser(newUser);
    // res.status(200).json({ message: "User Created", user: newUser });
    
    //creo token con jwt
    const token = authJwt.generateToken(savedUser)
    console.log(token)
    res.status(200).json({message:'generated token',token})
  } catch (error) {
    res.status(500).json({ message: "Error controller", error });
  }
};

export const signIn = async (req, res) => {
  const filter = {email:req.body.email}
  // const userFound = await usersService.findOneUser(filter)
  const userFound = await usersModel.findOne(filter).populate("roles")
  console.log(userFound);
  if(!userFound) return res.status(400).json({message: "User not found"})
  const matchPassword = await compereData(req.body.password,userFound.password)
  if(!matchPassword) return res.status(401).json({token:null,message:'invalid Password'})
  const token = authJwt.generateToken(userFound)
  res.json({token})
};
