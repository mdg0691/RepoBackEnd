import mongoose, { Schema } from "mongoose";


const TicketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const ticketModel = mongoose.model("Ticket", TicketSchema);