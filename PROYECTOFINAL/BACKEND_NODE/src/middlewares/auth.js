import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { usersService } from "../services/users.service.js";
import Role from "../DAL/mongoDB/models/role.model.js";

const PRIVATE_KEY = config.private_key;
const PRIVATE_REFRESH_KEY = config.jwt_refresh_secret;
const JWT_COOKIE=config.jwt_cookie

export const generateToken = (user) => {
  try {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '86400' }); //86400 = 24hs
    return token; 
  } catch (error) {
    res.status(500).json({message:'Failed to generate cookie and token',error})
  }
};

export const authToken = (req, res, next) => {
  console.log(req.headers);
  const authHeader = req.headers.authorization.split(' ')[1] 
  console.log(authHeader);
  // const token = authHeader || req.cookies.jwt
  if (!authHeader) {
    return res.status(401).json({ message: "no token provided" });
  }
  try {
    // const token = authHeader; //se hace split para retirar la palabra bearer
    jwt.verify(authHeader, PRIVATE_KEY, (error, credentials) => {
      if (error) {
        return res.status(403).json({ message: "Not authoraized" });
      }
      req.user = credentials.user;

      next();
    });
  } catch (error) {}
};

// Middleware para validar la cookie
export const validarCookie = (req, res, next) => {
  console.log(req.headers);
  const jwtCookie = req.cookies[JWT_COOKIE];

  if (!jwtCookie) {
      return res.status(401).json({ mensaje: "Acceso no autorizado. La cookie no está presente." });
  }
  next();
}


export const isModerator = async (req, res, next) => {
  const user = await usersService.findOneById(req.user._id);
  console.log(user);
  const roles = await Role.find({ _id: { $in: user.roles } });
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "requiere moderator rol" });
};
export const isAdmin = async (req, res, next) => {
    const user = await usersService.findOneById(req.user._id);
    console.log(user);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }
    return res.status(403).json({ message: "requiere admin rol" });
  };
