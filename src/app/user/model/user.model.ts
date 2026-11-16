import { HydratedDocument, Schema, model } from "mongoose";
import { Gender, Provider } from "../enum/enum";
import { IUser } from "../interface/user.interface";

export type UserDocument = HydratedDocument<IUser>;

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      toLowerCase: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === Provider.LOCAL;
      },
      trim: true,
      minlength: 6,
    },
    provider: {
      type: Number,
      enum: [Provider.LOCAL, Provider.GOOGLE, Provider.FACEBOOK],
      default: Provider.LOCAL,
    },
    gender: {
      type: Number,
      enum: [Gender.MALE, Gender.FEMALE],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model("User", userSchema);
