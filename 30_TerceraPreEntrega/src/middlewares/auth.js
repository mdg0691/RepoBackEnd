import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { usersService } from "../services/users.service.js";
import Role from "../DAL/mongoDB/models/role.model.js";

const PRIVATE_KEY = config.private_key;

export const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: 86400 }); //86400 = 24hs

  return token;
};

export const authToken = (req, res, next) => {
  const authHeader = req.headers["x-access-token"];
  if (!authHeader) {
    return res.status(401).json({ message: "no token provided" });
  }
  try {
    const token = authHeader; //se hace split para retirar la palabra bearer
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
      if (error) {
        return res.status(403).json({ message: "Not authorazed" });
      }
      req.user = credentials.user;

      next();
    });
  } catch (error) {}
};

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
