import mongoose, { model } from "mongoose";

export type UserDocument = mongoose.Document & {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  fullName: string;
};

export const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
  },
  { timestamps: true }
);

export const User =
  (mongoose.models.User as mongoose.Model<UserDocument>) ||
  model<UserDocument>("User", UserSchema);
