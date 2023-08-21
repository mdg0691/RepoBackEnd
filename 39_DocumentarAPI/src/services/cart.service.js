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
  async findOneCart(id) {
    try {
      const response = await cartsMongo.findById(id);
      return response;
    } catch (error) {
      return error;
    }
  }
  async createCart(obj) {
    try {
      const response = await cartsMongo.create(obj);
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