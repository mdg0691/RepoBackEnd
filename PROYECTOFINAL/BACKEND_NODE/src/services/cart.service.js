import {cartsMongo} from "../DAL/DAOs/MongoDAOs/cartMongo.js";

class CartsService {
  async findAllCarts() {
    try {
      const response = await cartsMongo.findAll()
      console.log(response);
      return response
    } catch (error) {
      return error;
    }
  }
  async findOneCart(x) {
    try {
      const response = await cartsMongo.findOne(x);
      
      console.log(response);
      return response;
    } catch (error) {
      return error;
    }
  }
  async findCartById(id) {
    try {
      const response = await cartsMongo.findOneById(id)
      return response;
    } catch (error) {
      return error;
    }
  }
  async createCart(obj) {
    try {
      const response = await cartsMongo.createOne(obj)
      return response;
    } catch (error) {
      return error;
    }
  }
  async findOneAndUpdate(id, user) {
    try {
      const response = await cartsMongo.findOneUpdated(id, user)
      return response;
    } catch (error) {
      return error;
    }
  }
  async createPurchase(obj) {
    try {
      const response = await cartsMongo.create(obj);
      return response;
    } catch (error) {
      return error;
    }
  }
  async deleteCart(id) {
    try {
      const response = await cartsMongo.deleteOne(id);
      return response;
    } catch (error) {
      return error;
    }
  }
}
export const cartsService = new CartsService()