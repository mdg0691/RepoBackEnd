import mongoose, { Schema } from "mongoose";

const TicketSchema = new mongoose.Schema({
  purchaser: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  products: {
    type: [
      {
        //basicamente lo que se hace aqui es generar la referencia a mi producto en la base de datos
        //sin este tipo de modelo no puedo generar esa ref
        id_prod: {
          type: Schema.Types.ObjectId,
          ref: "Products",
        },
        cantidad: {
          type: Number,
          default: 1,
        },
        subtotal: {
          type: Number
        }
      },
    ],
    default: [], //cada vez q creo un nuevo cart el valor de carrito sera vacio
  },
  amount: {
    type: Number,
    required: true,
  },
});

TicketSchema.pre(['find','findOne'], function(next) {
  this.populate('products.id_prod');
  next()
});

export const ticketModel = mongoose.model("Ticket", TicketSchema);
