import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config(); // Load biến môi trường từ .env

const SECRET_KEY = process.env.JWT_SECRET || "emiton"; // Sử dụng biến môi trường

// 🟢 Đăng ký tài khoản
export const register = async (req, res) => {
  try {
    let { name, email, password, birthDate, gender } = req.body;

    if (!name || !email || !password || !birthDate || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    email = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatar = "";

    const newUser = new User({
      name: name.trim(),
      email,
      avatar,
      password: hashedPassword,
      birthDate,
      gender,
    });

    await newUser.save();

    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      birthDate: newUser.birthDate,
      gender: newUser.gender,
    });
  } catch (error) {
    console.error("❌ Registration error:", error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Duplicate key error, email already exists" });
    }
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};
// 🔵 Đăng nhập
export const login = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  email = email.trim().toLowerCase(); // Chuẩn hóa email

  try {
    console.log("🔍 Searching user with email:", email); // ✅ Debug

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ No user found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("✅ User found:", user);

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("🔑 Password match:", isPasswordValid); // ✅ Debug

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔑 Tạo token
    const token = jwt.sign(
      { _id: user._id, email: user.email, name: user.name },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
