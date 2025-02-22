import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true }, // Ensure unique
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
    birthDate: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  },
  { timestamps: true }
);

// Force MongoDB to enforce unique email
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);
export default User;
