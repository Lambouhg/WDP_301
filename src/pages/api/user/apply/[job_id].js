//get by userId
//get by companyId
//update by companyId
//delete by userId

// src/pages/api/apply/[job_id].js
import connectDB from "../../../../lib/mongodb";
import Applicant from "../../../../models/applicant";
import Job from "../../../../models/job";
import User from "../../../../models/User";
import { getAuth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import getRawBody from "raw-body";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await connectDB();
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: No valid token" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const jobID = req.query.job_id;
  if (!mongoose.Types.ObjectId.isValid(jobID)) {
    return res.status(400).json({ message: "Invalid job ID format" });
  }

  const jobObjectId = new mongoose.Types.ObjectId(jobID);
  
  try {
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "user") {
      return res.status(403).json({ message: "Only users can apply for jobs" });
    }

    // Kiểm tra nếu user đã apply
    const existingApplication = await Applicant.findOne({
      jobID: jobObjectId,
      userID: user._id,
    });

    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    // Đọc dữ liệu từ request bằng `getRawBody`
    const rawBody = await getRawBody(req);
    const parsedBody = JSON.parse(rawBody.toString("utf-8"));
    const { fullName, email, phoneNumber, currentJobTitle, linkedinURL, portfolioURL, additionalInfo, resume } = parsedBody;

    // Kiểm tra xem có thiếu dữ liệu không
    if (!fullName || !email || !phoneNumber) {
      return res.status(400).json({ message: "Missing required fields: fullName, email, phoneNumber" });
    }

    // Lấy thông tin companyId từ Job
    const job = await Job.findById(jobObjectId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const companyId = job.companyId;  // Lấy companyId từ Job

    // Tạo đơn ứng tuyển mới
    const newApplication = new Applicant({
      jobID: jobObjectId,
      userID: user._id,
      companyID: companyId,
      fullName,
      email,
      phoneNumber,
      currentJobTitle,
      linkedinURL,
      portfolioURL,
      additionalInfo,
      resume,
    });

    await newApplication.save();
    await Job.findByIdAndUpdate(jobObjectId, { $inc: { applicants: 1 } });

    res.status(201).json({
      message: "Application submitted successfully",
      applicant: {
        ...newApplication.toObject(),  // Chuyển đổi applicant thành đối tượng thường
        companyID: companyId,  // Thêm companyId vào applicant
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}