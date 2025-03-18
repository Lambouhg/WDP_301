// src/pages/api/job/all.js
import connectDB from "../../../lib/mongodb";
import Job from "../../../models/job";
import mongoose from "mongoose";
import "../../../models/company";


export default async function handler(req, res) {
    await connectDB(); // Kết nối DB

    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        let { jobId, jobType, categories } = req.query;

        // 📌 Nếu có jobId, trả về chi tiết công việc
        if (jobId) {
            if (!mongoose.Types.ObjectId.isValid(jobId)) {
                return res.status(400).json({ message: "Invalid job ID" });
            }

            const job = await Job.findById(jobId).populate("companyId", "name");
            if (!job) {
                return res.status(404).json({ message: "Job not found" });
            }

            return res.status(200).json(job);
        }

        // Tạo bộ lọc truy vấn MongoDB
        let filter = { status: "Live" };

        // Nếu có `jobType` thì thêm điều kiện lọc
        if (jobType) {
            filter.jobType = jobType;
        }

        // Nếu có `categories` thì thêm điều kiện lọc
        if (categories) {
            filter.categories = { $in: categories.split(",") };
        }

        // Đếm tổng số công việc phù hợp với bộ lọc
        const totalJobs = await Job.countDocuments(filter);

        // Truy vấn danh sách công việc theo bộ lọc
        const jobs = await Job.find(filter).populate("companyId", "name");

        // Kiểm tra và đảm bảo mỗi công việc có categories là mảng (tránh lỗi frontend)
        jobs.forEach((job) => {
            if (!Array.isArray(job.categories)) {
                job.categories = []; // Gán giá trị mặc định là mảng trống nếu không có categories
            }
        });

        return res.status(200).json({
            jobs,
            totalJobs,
        });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching jobs", error: error.message });
    }
}

