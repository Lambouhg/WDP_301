import { connectDB } from "../../../lib/mongodb";
import Company from "../../../models/company";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await connectDB();
    try {
      const companies = await Company.find({});
      res.status(200).json(companies);
    } catch (error) {
      res.status(500).json({ message: "Error fetching companies", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
