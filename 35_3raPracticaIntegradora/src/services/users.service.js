import { usersMongo } from "../DAL/DAOs/MongoDAOs/usersMongo.js";
import { hashData } from "../utils/bcryp.js";
class UsersService {
  async findAllUsers() {
    try {
      const response = await usersMongo.findAll();
      return response
    } catch (error) {
      return error;
    }
  }
  async findOneById(id) {
    try {
      const response = await usersMongo.findOneById(id);
      return response;
    } catch (error) {
      return error;
    }
  }
  async findOneUser(email) {
    try {
      const response = await usersMongo.findOne(email);
      return response;
    } catch (error) {
      return error;
    }
  }
  async createOneUser(user) {
    try {
      const hashPassword = await hashData(user.password);
      const newUser = { ...user, password: hashPassword };
      
      const response = await usersMongo.createOne(newUser);
      console.log('paso services');
      console.log(response);
      return response;
    } catch (error) {
      return json({ message: "Error services", error });;
    }
  }
  async deleteOneUser(id) {
    try {
      const response = await usersMongo.deleteOne(id);
      return response;
    } catch (error) {
      return error;
    }
  }
}
export const usersService = new UsersService()