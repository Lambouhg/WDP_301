//src/pages/api/company/index.js
import connectDB from "../../../lib/mongodb";  
import Company from "../../../models/company";
import { getAuth } from "@clerk/nextjs/server";
import User from "../../../models/User";
import getRawBody from "raw-body";
import mongoose from "mongoose";

// Cấu hình API không sử dụng bodyParser mặc định của Next.js
export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  await connectDB();  // Kết nối cơ sở dữ liệu MongoDB
  
  if (req.method === "GET") {
    // Lấy tất cả các công ty từ cơ sở dữ liệu
    try {
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
    const existingCompany = await Company.findOne({ ownerId: user._id });
    if (existingCompany) {
      return res.status(400).json({ message: "User already owns a company. Only one company is allowed." });
    }
    try {
      const rawBody = await getRawBody(req);
      const requestData = JSON.parse(rawBody.toString("utf-8"));

      // Lấy thông tin từ request body
      const { name, description, location, website, employees, industry, dateFounded, techStack, socialLinks, team } = requestData;

      if (!name || !description || !location) {
        return res.status(400).json({ message: "Missing required fields", fields: { name, description, location } });
      }

      // Nếu không có team, chỉ sử dụng mảng trống
      const teamMembers = team && team.length > 0 ? team.map(member => {
        if (!mongoose.Types.ObjectId.isValid(member.user)) {
          throw new Error(`Invalid user ID: ${member.user}`);
        }
        return { user: mongoose.Types.ObjectId(member.user) };  // Đảm bảo user là ObjectId hợp lệ
      }) : [];

      // Tạo công ty mới
      const newCompany = new Company({
        name,
        description,
        location,
        website,
        employees,
        industry,
        dateFounded,
        techStack,
        socialLinks,
        team: teamMembers,  // Đảm bảo team là mảng chứa ObjectId hợp lệ (hoặc mảng rỗng nếu không có team)
        ownerId: user._id,
      });

      // Lưu công ty mới vào cơ sở dữ liệu
      await newCompany.save();

      // Cập nhật `companyId` trong user
      user.companyId = newCompany._id;
      await user.save();

      res.status(201).json({ message: "Company created successfully", company: newCompany });
    } catch (error) {
      console.error("❌ Error creating company:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}