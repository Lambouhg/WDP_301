import { Facebook } from "lucide-react";
import connectDB from "../../../../lib/mongodb";
import Applicant from "../../../../models/applicant";
import User from "../../../../models/User";
import { getAuth } from "@clerk/nextjs/server";
import getRawBody from "raw-body"; // Import thư viện raw-body để đọc body

// Tắt bodyParser của Next.js để sử dụng raw-body
export const config = {
  api: {
    bodyParser: false, // Tắt bodyParser của Next.js
  },
};

export default async function handler(req, res) {
  await connectDB();
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: No valid token" });
  }

  // Xử lý phương thức GET
  if (req.method === "GET") {
    try {
      const { applicant_id } = req.query; // Lấy applicant_id từ URL

      // Kiểm tra người dùng có phải là công ty không
      const user = await User.findOne({ clerkId: userId });
      if (!user || user.role !== "company") {
        return res.status(403).json({
          message: "Access denied. Only companies can view applicants.",
        });
      }

      // Tìm ứng viên dựa trên applicant_id
      const applicant = await Applicant.findById(applicant_id)
        .populate("userID", "name email phone avatar appliedJobs socialLinks ") // Populate thông tin user
        .select("+resume"); // Include trường resume

      if (!applicant) {
        return res.status(404).json({ message: "Applicant not found" });
      }

      // Kiểm tra quyền công ty
      if (applicant.companyID.toString() !== user.companyId.toString()) {
        return res.status(403).json({
          message: "You are not authorized to view this applicant.",
        });
      }

      res.status(200).json({
        message: "Applicant details fetched successfully",
        applicant: {
          _id: applicant._id,
          userID: applicant.userID,
          status: applicant.status,
          jobID: applicant.jobID,
          fullName: applicant.fullName,
          email: applicant.email,
          phoneNumber: applicant.phoneNumber,
          currentJobTitle: applicant.currentJobTitle,
          linkedinURL: applicant.linkedinURL,
          portfolioURL: applicant.portfolioURL,
          additionalInfo: applicant.additionalInfo,
          resume: applicant.resume,
          createdAt: applicant.createdAt,
          updatedAt: applicant.updatedAt,
          avatar: applicant.userID.avatar,
          name: applicant.userID.name,
          appliedJobs: applicant.userID.appliedJobs,
          status: applicant.status,
          email: applicant.userID.email,
          phone: applicant.userID.phone,
          socialLinks: applicant.userID.socialLinks,
          jobType: applicant.jobID.jobType,
          categories: applicant.jobID.categories,
          appliedJobs: applicant.userID.appliedJobs,
          title: applicant.jobID.title,
        },
      });
    } catch (error) {
      console.error("Error fetching applicant:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }

  // Xử lý phương thức PUT (giữ nguyên code gốc)
  else if (req.method === "PUT") {
    const { applicant_id } = req.query; // Lấy applicant_id từ URL

    try {
      const rawBody = await getRawBody(req);
      const parsedBody = JSON.parse(rawBody.toString("utf-8"));

      const { status } = parsedBody;
      console.log("Received status:", status);

      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      const validStatuses = [
        "In Review",
        "In Reviewing",
        "Shortlisted",
        "Hired",
        "Rejected",
      ];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          message: `Invalid status. Valid statuses are: ${validStatuses.join(", ")}`,
        });
      }

      const user = await User.findOne({ clerkId: userId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.role !== "company") {
        return res.status(403).json({
          message: "Access denied. Only companies can update applicants' status.",
        });
      }

      const applicant = await Applicant.findById(applicant_id);
      if (!applicant) {
        return res.status(404).json({ message: "Applicant not found" });
      }

      if (applicant.companyID.toString() !== user.companyId.toString()) {
        return res.status(403).json({
          message: "You are not authorized to update this applicant's status.",
        });
      }

      applicant.status = status;
      await applicant.save();

      res.status(200).json({
        message: "Applicant status updated successfully",
        applicant: {
          _id: applicant._id,
          userID: applicant.userID,
          status: applicant.status,
        },
      });
    } catch (error) {
      console.error("Error occurred:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}