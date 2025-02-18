import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, default: uuidv4 },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthDate: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  },
  { timestamps: true } // This automatically adds `createdAt` and `updatedAt`
);

const User = mongoose.model('User', userSchema);

export default User;
