import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requerid: true,
    },
    lastname:{
      type: String,
      requerid: true,
    },
    email: {
      type: String,
      requerid: true,
      unique: true,
    },
    password: {
      type: String,
      requerid: true,
    },
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

userSchema.pre('find', function(next) {
  this.populate('roles')
  next()
});

export const usersModel = mongoose.model("Users", userSchema);
