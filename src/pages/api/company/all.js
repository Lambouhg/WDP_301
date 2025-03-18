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
            // Fetch all companies from the database
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
            res.status(200).json(companies);
        } catch (error) {
            console.error("Error fetching companies: ", error);
            res.status(500).json({ message: "Error fetching companies" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}