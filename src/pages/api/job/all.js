// src/pages/api/job/all.js
import connectDB from "../../../lib/mongodb";
import Job from "../../../models/job";
import "../../../models/company";


export default async function handler(req, res) {
    await connectDB(); // Kết nối DB

    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        let { page = 1, limit = 10, jobType } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
            return res.status(400).json({ message: "Invalid page or limit" });
        }

        // Tạo bộ lọc truy vấn MongoDB
        let filter = { status: "Live" };

        // Nếu có `jobType` thì thêm điều kiện lọc
        if (jobType) {
            filter.jobType = jobType;
        }

        // Đếm tổng số công việc phù hợp với bộ lọc
        const totalJobs = await Job.countDocuments(filter);
        const totalPages = Math.ceil(totalJobs / limit);

        // Truy vấn danh sách công việc theo bộ lọc
        const jobs = await Job.find(filter)
            .populate("companyId", "name")
            .skip((page - 1) * limit)
            .limit(limit);

        return res.status(200).json({
            jobs,
            page,
            totalPages,
            totalJobs,
        });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching jobs", error: error.message });
    }
}

