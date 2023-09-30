import { ticketsMongo } from "../DAL/DAOs/MongoDAOs/ticketsMongo.js";

class TicketService {
  async findAllTickets() {
    try {
      const response = await ticketsMongo.findAll()
      console.log(response);
      return response
    } catch (error) {
      return error;
    }
  }
  async findOneTicket(id) {
    try {
      const response = await ticketsMongo.findById(id);
      return response;
    } catch (error) {
      return error;
    }
  }
  async createTicket(obj) {
    try {
      const response = await ticketsMongo.createOne(obj);
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteTicket(id) {
    try {
      const response = await ticketsMongo.deleteOne(id);
      return response;
    } catch (error) {
      return error;
    }
  }
}
export const ticketService = new TicketService()