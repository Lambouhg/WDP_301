import connectDB from "../../../lib/mongodb";
import Job from "../../../models/job";
import "../../../models/company";


export default async function handler(req, res) {
    await connectDB(); // Kết nối DB

    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        // Lấy query params: page & limit (nếu không có thì mặc định)
        let { page = 1, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
            return res.status(400).json({ message: "Invalid page or limit" });
        }

        // Đếm tổng số công việc
        const totalJobs = await Job.countDocuments({ status: "Live" });

        // Tính số trang
        const totalPages = Math.ceil(totalJobs / limit);


        // Lấy tất cả công việc có status = "Live"
        const jobs = await Job.find({ status: "Live" }).populate("companyId", "name").skip((page - 1) * limit).limit(limit);

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
