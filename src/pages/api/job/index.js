import connectDB from "../../../lib/mongodb";
import Job from "../../../models/job";
import User from "../../../models/User";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const { userId } = getAuth(req); // Lấy userId từ token của Clerk

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized: No valid token" });
      }

      // Tìm user trong database theo clerkId
      const user = await User.findOne({ clerkId: userId });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!user.companyId) {
        return res.status(403).json({ message: "You must be a company owner to view jobs" });
      }

      // Lấy danh sách công việc theo companyId
      const jobs = await Job.find({ companyId: user.companyId });

      res.status(200).json(jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ message: "Error fetching jobs", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
