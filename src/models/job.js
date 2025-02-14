//models/jobs.js
import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: Number, required: true },
    location: { type: String },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // Danh sách user đã apply
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
