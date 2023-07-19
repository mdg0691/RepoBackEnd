import { productsMongo } from "../DAL/DAOs/MongoDAOs/productsMongo.js";

class ProductsService {
  async findAllProducts() {
    try {
      const response = await productsMongo.findAll();
      return response
    } catch (error) {
      return error;
    }
  }
  async findOneProducts(id) {
    try {
      const response = await productsMongo.findOneById(id);
      return response;
    } catch (error) {
      return error;
    }
  }
  async createOneProduct(product) {
    try {
      const response = await productsMongo.createOne(product);
      return response;
    } catch (error) {
      return error;
    }
  }
  async deleteOneProduct(id) {
    try {
      const response = await productsMongo.deleteOne(id);
      return response;
    } catch (error) {
      return error;
    }
  }
}
export const productsService = new ProductsService()