// pages/api/users.js
import { connectToDatabase } from "../../lib/mongodb";
import User from "../../models/User";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  // Lấy thông tin user từ Clerk
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await connectToDatabase();
  const users = await User.find();
  res.status(200).json(users);
}
