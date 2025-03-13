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

  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { applicant_id } = req.query; // Lấy applicant_id từ URL

  // Đọc dữ liệu từ request body bằng raw-body
  try {
    const rawBody = await getRawBody(req);
    const parsedBody = JSON.parse(rawBody.toString("utf-8"));

    // Lấy status từ body
    const { status } = parsedBody;
    console.log("Received status:", status); // Log giá trị status nhận được từ body

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    // Kiểm tra trạng thái hợp lệ
    const validStatuses = ["In review", "Shortlisted", "Interview", "Hired"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Valid statuses are: ${validStatuses.join(', ')}` });
    }

    // Kiểm tra người dùng có phải là công ty không
    const user = await User.findOne({ clerkId: userId });
    console.log("User found: ", user); // Log thông tin người dùng

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Kiểm tra xem người dùng có phải là "company" không
    if (user.role !== "company") {
      return res.status(403).json({
        message: "Access denied. Only companies can update applicants' status.",
      });
    }

    // Lấy thông tin ứng viên từ Applicant mà không cần populate jobID
    const applicant = await Applicant.findById(applicant_id);
    console.log("Applicant found: ", applicant); // Log thông tin ứng viên

    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    // Kiểm tra xem công ty có quyền thay đổi trạng thái này không (dựa trên companyId)
    if (applicant.companyID.toString() !== user.companyId.toString()) {
      return res.status(403).json({
        message: "You are not authorized to update this applicant's status.",
      });
    }

    // Cập nhật trạng thái trong Applicant
    console.log(`Updating status for applicant ${applicant._id} to ${status}`);
    applicant.status = status;
    await applicant.save();

    // Trả về kết quả
    res.status(200).json({
      message: "Applicant status updated successfully",
      applicant: {
        _id: applicant._id,
        userID: applicant.userID,
        status: applicant.status,
      },
    });
  } catch (error) {
    console.error("Error occurred:", error); // Log lỗi chi tiết
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}