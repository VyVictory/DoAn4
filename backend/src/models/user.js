import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true, unique: true, default: uuidv4 },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false },
    birthDate: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
