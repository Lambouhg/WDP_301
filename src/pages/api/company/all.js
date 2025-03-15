// src/pages/api/company/all.js
import connectDB from "../../../lib/mongodb";
import Company from "../../../models/company";
import mongoose from "mongoose";


export default async function handler(req, res) {
    await connectDB();


    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {

        let { companyId, page = 1, limit = 10 } = req.query;

        // Chuyển đổi page và limit sang kiểu số nguyên
        page = parseInt(page);
        limit = parseInt(limit);

        // 📌 Kiểm tra giá trị hợp lệ của page & limit
        if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
            return res.status(400).json({ message: "Invalid page or limit" });
        }

        // 📌 Nếu có companyId, trả về chi tiết công ty
        if (companyId) {
            if (!mongoose.Types.ObjectId.isValid(companyId)) {
                return res.status(400).json({ message: "Invalid company ID" });
            }

            const company = await Company.findById(companyId);
            if (!company) {
                return res.status(404).json({ message: "Company not found" });
            }

            return res.status(200).json(company);
        }

        //Nếu không có `companyId`, lấy danh sách công ty
        const companies = await Company.find({})
            .skip((page - 1) * limit)
            .limit(limit);

        // Đếm tổng số công ty để tính tổng số trang
        const totalCompanies = await Company.countDocuments();
        const totalPages = Math.ceil(totalCompanies / limit);


        return res.status(200).json({
            success: true,
            companies,
            page,
            totalPages,
            totalCompanies,
        });
    } catch (error) {
        console.error("Error fetching companies:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}
