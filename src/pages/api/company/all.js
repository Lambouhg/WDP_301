import mongoose from "mongoose";
import Company from "../../../models/company";

const connectToDatabase = async () => {
    if (mongoose.connections[0].readyState) {
        return;
    }
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

export default async function handler(req, res) {
    await connectToDatabase();

    if (req.method === "GET") {
        try {
            // Kiểm tra nếu có query parameter 'id'
            const { id } = req.query;

            if (id) {
                // Lấy chi tiết công ty theo ID
                const company = await Company.aggregate([
                    {
                        $match: { _id: new mongoose.Types.ObjectId(id) } // Tìm công ty theo ID
                    },
                    {
                        $lookup: {
                            from: 'jobs',
                            localField: '_id',
                            foreignField: 'companyId',
                            as: 'jobs'
                        }
                    },
                    {
                        $project: {
                            name: 1,
                            logo: 1,
                            description: 1,
                            website: 1,           // Thêm các trường chi tiết
                            employees: 1,
                            industry: 1,
                            dateFounded: 1,
                            techStack: 1,
                            socialLinks: 1,
                            jobsCount: { $size: '$jobs' },
                            jobs: 1              // Giữ mảng jobs để xem chi tiết
                        }
                    }
                ]);

                if (!company.length) {
                    return res.status(404).json({ message: "Company not found" });
                }

                // Trả về công ty đầu tiên (vì $match chỉ trả về 1 document)
                return res.status(200).json(company[0]);
            } else {
                // Lấy tất cả công ty (logic hiện tại)
                const companies = await Company.aggregate([
                    {
                        $lookup: {
                            from: 'jobs',
                            localField: '_id',
                            foreignField: 'companyId',
                            as: 'jobs'
                        }
                    },
                    {
                        $project: {
                            name: 1,
                            logo: 1,
                            description: 1,
                            jobsCount: { $size: '$jobs' }
                        }
                    }
                ]);
                return res.status(200).json(companies);
            }
        } catch (error) {
            console.error("Error fetching companies: ", error);
            return res.status(500).json({ message: "Error fetching companies" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}