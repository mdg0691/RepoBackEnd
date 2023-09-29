import { Schema, model } from "mongoose";

//Genero mi modelo de mensaje con sus atributos para enviar mensajes
const messageSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const messageModel = model("messages", messageSchema);
