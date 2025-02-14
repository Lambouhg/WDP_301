import { getAuth } from "@clerk/nextjs/server";
import { connectDB } from "../../../lib/mongodb";
import Job from "../../../models/job";
import Company from "../../../models/company";
import User from "../../../models/User";
import getRawBody from "raw-body";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Lấy thông tin user từ Clerk
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: No valid token" });
  }

  console.log("📌 UserId từ Clerk:", userId);

  // Xử lý body
  let requestData;
  try {
    const rawBody = await getRawBody(req);
    requestData = JSON.parse(rawBody.toString("utf-8"));
  } catch (error) {
    return res.status(400).json({ message: "Invalid JSON format", error: error.message });
  }

  await connectDB();

  try {
    // Kiểm tra user tồn tại
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Kiểm tra role
    if (user.role !== "company") {
      return res.status(403).json({ message: "Only company users can create jobs" });
    }

    // Kiểm tra user có công ty không
    const company = await Company.findOne({ ownerId: user._id });
    if (!company) {
      return res.status(403).json({ message: "User does not own a company" });
    }

    // Kiểm tra dữ liệu đầu vào
    const { title, description, salary, location } = requestData;
    if (!title || !description || !salary || !location) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Tạo Job mới
    const newJob = new Job({
      title,
      description,
      salary,
      location,
      companyId: company._id,
    });
    await newJob.save();

    // Thêm Job vào công ty
    company.jobs.push(newJob._id);
    await company.save();

    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
