//src/pages/api/company/index.js
import connectDB from "../../../lib/mongodb";  
import Company from "../../../models/company";
import { getAuth } from "@clerk/nextjs/server";
import User from "../../../models/User";
import getRawBody from "raw-body";

// Cấu hình API không sử dụng bodyParser mặc định của Next.js
export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  await connectDB();  // Kết nối cơ sở dữ liệu MongoDB
  
  if (req.method === "GET") {
    try {
      // Lấy tất cả công ty
      const companies = await Company.find({});
      res.status(200).json(companies);
    } catch (error) {
      res.status(500).json({ message: "Error fetching companies", error: error.message });
    }
  } else if (req.method === "POST") {
    const { userId } = getAuth(req);  // Lấy userId từ token
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No valid token" });
    }

    // Lấy thông tin người dùng từ Clerk
    const user = await User.findOne({ clerkId: userId });
    if (!user || user.role !== "company") {
      return res.status(403).json({ message: "Only company users can create companies" });
    }

    // Kiểm tra xem người dùng đã có công ty chưa (dựa vào trường `companyId`)
    if (user.companyId) {
      return res.status(400).json({ message: "User already owns a company. Only one company is allowed." });
    }

    try {
      const rawBody = await getRawBody(req);
      const requestData = JSON.parse(rawBody.toString("utf-8"));

      // Lấy thông tin từ request body
      const { name, description, location } = requestData;

      if (!name || !description || !location) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Tạo công ty mới
      const newCompany = new Company({
        name,
        description,
        location,
        ownerId: user._id,
      });

      // Lưu công ty mới vào cơ sở dữ liệu
      await newCompany.save();

      // Cập nhật `companyId` trong user
      user.companyId = newCompany._id;
      await user.save();

      res.status(201).json({ message: "Company created successfully", company: newCompany });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
