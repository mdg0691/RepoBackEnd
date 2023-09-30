import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name:{
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: [{
      type: Schema.Types.ObjectId,
      ref: "Carts",
    }],
    roles: [{
        type: Schema.Types.ObjectId,
        ref: "Role"
      }]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre(['find','findOne'], function(next) {
  this.populate('roles');
  this.populate('cart')
  next()
});

export const usersModel = mongoose.model("Users", userSchema);



