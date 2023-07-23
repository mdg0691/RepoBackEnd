import { messageModel } from "../DAL/mongoDB/models/message.model.js";

class MessagesService {
  async findAllMessages() {
    try {
        console.log('prueba');
      const response = await messageModel.find()
      console.log(response)
      return response
    } catch (error) {
      return error;
    }
  }
  async findOneMessages(id) {
    try {
      const response = await messageModel.findOneById(id);
      return response;
    } catch (error) {
      return error;
    }
  }
  async createOneMessages(message) {
    try {

        const response = await messageModel.create(message);
      return response;
    } catch (error) {
      return error;
    }
  }
  async deleteOneMessages(id) {
    try {
      const response = await messageModel.deleteOne(id);
      return response;
    } catch (error) {
      return error;
    }
  }
}
export const messagesService = new MessagesService()