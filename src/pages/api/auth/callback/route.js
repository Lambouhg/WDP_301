import { connectDB } from "../../../../lib/mongodb"; // Kết nối với MongoDB
import { getAuth } from "@clerk/nextjs/server"; // Lấy thông tin người dùng từ Clerk
import User from "../../../../models/User"; // Model người dùng của MongoDB

export default async function handler(req, res) {
  await connectDB(); // Kết nối với MongoDB

  const { userId } = getAuth(req); // Lấy userId từ Clerk (từ token JWT)
  if (!userId) {
    return res.status(401).json({ message: "Chưa đăng nhập" }); // Nếu không có userId, trả lỗi
  }

  try {
    const userResponse = await fetch(
      `https://api.clerk.dev/v1/users/${userId}`,
      {
        headers: { Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` }, // Cung cấp key bảo mật từ Clerk
      }
    );

    const userData = await userResponse.json(); // Dữ liệu người dùng

    // Kiểm tra xem người dùng đã có trong MongoDB chưa
    let user = await User.findOne({ clerkId: userData.id });
    if (!user) {
      // Nếu người dùng chưa có, tạo mới
      user = new User({
        clerkId: userData.id,
        email: userData.email_addresses[0].email_address,
        name: userData.first_name + " " + userData.last_name,
        image: userData.image_url,
      });
      await user.save(); // Lưu người dùng vào MongoDB
    }

    // Trả kết quả thành công
    res.status(200).json({ message: "Người dùng đã được lưu", user });
  } catch (error) {
    // Nếu có lỗi khi lưu, trả lỗi
    res.status(500).json({ message: "Lỗi server", error });
  }
}
