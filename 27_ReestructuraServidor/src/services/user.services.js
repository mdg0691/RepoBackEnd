import UserManager from "../DB/user.manager";
import { hashData } from "../utils/bcrypt";

const userManager = new UserManager();

export const findAll = async () => {
  try {
    const users = await userManager.findAll();
    return users;
  } catch (error) {
    return error;
  }
};
export const findById = async (id) => {
  try {
    const user = await userManager.finOneById(id);
    return user;
  } catch (error) {
    return error;
  }
};
export const createOne = async (obj) => {
  try {
    const hashPassword = await hashData(obj.password);
    const newObj = { ...obj, password: hashPassword };
    const newUser = await userManager.createOne(newObj);
    return newUser;
  } catch (error) {
    return error;
  }
};
