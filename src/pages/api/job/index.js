import connectDB from "../../../lib/mongodb";  
import Job from "../../../models/job";
import { getAuth } from "@clerk/nextjs/server";
import User from "../../../models/User";
import getRawBody from "raw-body";

export const config = { api: { bodyParser: false } };  // Tắt body parser mặc định

export default async function handler(req, res) {
  await connectDB();  // Kết nối cơ sở dữ liệu MongoDB
  
  if (req.method === "GET") {
    try {
      const { companyId } = req.query;
      const filter = companyId ? { companyId } : {};
      const jobs = await Job.find(filter);
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Error fetching jobs", error: error.message });
    }
  } else if (req.method === "POST") {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No valid token" });
    }

    const user = await User.findOne({ clerkId: userId });
    if (!user || user.role !== "company") {
      return res.status(403).json({ message: "Only company users can create jobs" });
    }

    if (!user.companyId) {
      return res.status(403).json({ message: "You must own a company to create jobs" });
    }

    try {
      // Sử dụng getRawBody để đọc request body
      const rawBody = await getRawBody(req);
      const requestData = JSON.parse(rawBody.toString("utf-8"));

      const newJob = new Job({
        ...requestData,
        companyId: user.companyId // Lấy companyId từ user, không cần gửi từ client
      });

      await newJob.save();
      res.status(201).json({ message: "Job created successfully", job: newJob });
    } catch (error) {
      console.error("Error creating job:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
