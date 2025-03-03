import User from "../models/user.js";
import mongoose from "mongoose";

// Get User Profile
export const getProfile = async (req, res) => {
  try {
    // Tìm user theo ID và loại bỏ password
    // console.log(req.user._id)
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("❌ Error fetching profile:", error);

    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
  }
};
export const getCurrentUser = async (req, res) => {
  try {
    // Tìm user theo ID và loại bỏ password
    // console.log(req.user._id)
    const id = req.params.id; // Lấy trực tiếp ID

    const user = await User.findById(id).select("-password -email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("❌ Error fetching profile:", error);

    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
  }
};
export const getUsersByUsername = async (req, res) => {
  try {
    const { name } = req.params;

    // Tìm các user có username chứa chuỗi tìm kiếm (không phân biệt hoa thường)
    const users = await User.find({
      name: { $regex: name, $options: "i" },
    }).select("-password");

    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }

    res.json(users);
  } catch (error) {
    console.error("❌ Error fetching users by username:", error);
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};
