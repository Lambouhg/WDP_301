// src/pages/api/user/[user_id].js
import connectDB from "../../../lib/mongodb";
import User from "../../../models/User";
import { getAuth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import getRawBody from "raw-body";

// Cấu hình API không sử dụng bodyParser mặc định của Next.js
export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  await connectDB(); // Kết nối DB

  const { user_id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const user = await User.findById(user_id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { userId } = getAuth(req); // Lấy userId từ Clerk token
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: No valid token" });
  }

  // Chỉ admin hoặc chính user đó mới có quyền chỉnh sửa
  if (user.clerkId !== userId && user.role !== "admin") {
    return res.status(403).json({ message: "You are not allowed to modify this user" });
  }

  // Xử lý các phương thức HTTP
  if (req.method === "GET") {
    res.status(200).json({ user });
  } else if (req.method === "PATCH") {
    try {
      const rawBody = await getRawBody(req);
      const updateData = JSON.parse(rawBody.toString("utf-8"));

      const updatedUser = await User.findByIdAndUpdate(user_id, updateData, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error: error.message });
    }
  } 
}
