import { clerkClient } from "@clerk/nextjs/server"; // Import Clerk SDK
import { connectDB } from "../../../../lib/mongodb"; // Kết nối với MongoDB
import User from "../../../../models/User"; // Import Model User

export default async function handler(req, res) {
  await connectDB(); // Kết nối MongoDB

  try {
    // 1️⃣ Lấy token từ headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing or invalid authorization header" });
    }
    
    const token = authHeader.split(" ")[1]; // Lấy token từ "Bearer <token>"
    
    // 2️⃣ Xác thực token với Clerk
    const session = await clerkClient.sessions.verifyToken(token);
    if (!session) {
      return res.status(401).json({ message: "Unauthorized: Invalid session" });
    }
    
    // 3️⃣ Lấy thông tin người dùng từ Clerk
    const userData = await clerkClient.users.getUser(session.userId);

    // 4️⃣ Kiểm tra xem người dùng đã tồn tại trong MongoDB chưa
    let user = await User.findOne({ clerkId: userData.id });
    if (!user) {
      // Nếu chưa có, tạo người dùng mới
      user = new User({
        clerkId: userData.id,
        email: userData.email_addresses[0].email_address,
        name: `${userData.first_name} ${userData.last_name}`,
        image: userData.image_url,
      });
      await user.save(); // Lưu vào MongoDB
    }

    // 5️⃣ Trả về thông tin người dùng
    res.status(200).json({ message: "Người dùng đã được lưu", user });
  } catch (error) {
    console.error("Lỗi trong quá trình xác thực:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
import { connectDB } from "../../../../lib/mongodb";
import User from "../../../../models/User";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  await connectDB();
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ message: "Chưa đăng nhập" });
  }

  try {
    const userResponse = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: { Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` },
    });
    const userData = await userResponse.json();

    let user = await User.findOne({ clerkId: userData.id });
    if (!user) {
      let role = "user";

      if (userData.email_addresses[0].email_address === "oli00204@bcooq.com") {
        role = "admin";
      }

      user = new User({
        clerkId: userData.id,
        email: userData.email_addresses[0].email_address,
        name: userData.first_name + " " + userData.last_name,
        avatar: userData.image_url,
        role: role,
      });
      await user.save();
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in API route:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
}