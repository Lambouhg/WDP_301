import User from "../../models/User";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req, res) {

  try {
    const { userId, getToken } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ message: "Chưa đăng nhập" });
    }

    const token = await getToken();
    if (!token) {
      return res.status(401).json({ message: "Không thể lấy token" });
    }

    const userResponse = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!userResponse.ok) {
      return res.status(userResponse.status).json({ message: "Lỗi khi lấy dữ liệu từ Clerk" });
    }

    const userData = await userResponse.json();

    if (!userData.id || !userData.email_addresses || !userData.email_addresses.length) {
      return res.status(400).json({ message: "Dữ liệu người dùng không hợp lệ" });
    }

    let user = await User.findOne({ clerkId: userData.id });

    if (!user) {
      user = new User({
        clerkId: userData.id,
        email: userData.email_addresses[0].email_address,
        name: `${userData.first_name || ""} ${userData.last_name || ""}`.trim(),
        image: userData.image_url || "",
      });

      await user.save();
    }

    res.status(200).json({ message: "Người dùng đã được lưu", user });
  } catch (error) {
    console.error("❌ Lỗi trong auth.js:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
}
