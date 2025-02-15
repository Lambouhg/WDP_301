import connectDB from "../../../../lib/mongodb.js";
import User from "../../../../models/User";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  try {
    await connectDB(); // 🔥 Chỉ gọi một lần, đã tối ưu cache

    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ message: "Chưa đăng nhập" });
    }

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
    console.error("❌ Lỗi trong API route:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
}
