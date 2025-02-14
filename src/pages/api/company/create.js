import { getAuth } from "@clerk/nextjs/server";
import { connectDB } from "../../../lib/mongodb";
import Company from "../../../models/company";
import User from "../../../models/User";
import getRawBody from "raw-body";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: No valid token" });
  }

  let requestData;
  try {
    const rawBody = await getRawBody(req);
    requestData = JSON.parse(rawBody.toString("utf-8"));
  } catch (error) {
    return res.status(400).json({ message: "Invalid JSON format", error: error.message });
  }

  await connectDB();

  try {
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "company") {
      return res.status(403).json({ message: "Only company users can create a company" });
    }

    const { name, description, location } = requestData;
    if (!name || !description || !location) {
      return res.status(400).json({ message: "Missing required fields", receivedData: requestData });
    }

    const newCompany = new Company({
      name,
      description,
      location,
      ownerId: user._id,
    });

    await newCompany.save();

    res.status(201).json({ message: "Company created successfully", company: newCompany });
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
