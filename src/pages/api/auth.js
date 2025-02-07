import { connectDB } from "../../lib/mongodb"; // Đảm bảo đúng đường dẫn
import User from "../../models/User";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  await connectDB();

  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ message: "Chưa đăng nhập" });
  }

  try {
    // Lấy thông tin user từ Clerk
    const userResponse = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: { Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` },
    });

    const userData = await userResponse.json();

    // Kiểm tra nếu user đã tồn tại
    let user = await User.findOne({ clerkId: userData.id });
    if (!user) {
      user = new User({
        clerkId: userData.id,
        email: userData.email_addresses[0].email_address,
        name: userData.first_name + " " + userData.last_name,
        image: userData.image_url,
      });
      await user.save();
    }

    res.status(200).json({ message: "Người dùng đã được lưu", user });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
}
