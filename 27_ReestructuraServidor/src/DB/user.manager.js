import { userModel } from "./mongoDB/models/User.js";

export default class UserManager {
  async findAll() {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      return error;
    }
  }
  async finOneById(id) {
    try {
      const user = await userModel.findById(id);
      return user;
    } catch (error) {
      return error;
    }
  }
  async createOne(obj) {
    try {
      const newUser = await userModel.create(obj);
      return newUser;
    } catch (error) {
      return error;
    }
  }
  async updateOne(id, obj) {
    try {
      const updateUser = await userModel.updateOne({ _id: id }, { $set: obj });
      return updateUser;
    } catch (error) {
      return error;
    }
  }
  async deleteOne(id) {
    try {
      const deleteUser = await userModel.deleteOne({ _id: id });
      return deleteUser;
    } catch (error) {
      return error;
    }
  }
}
