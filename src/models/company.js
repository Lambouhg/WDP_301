// src/models/company.js
import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }]
  },
  { timestamps: true }
);

export default mongoose.models.Company || mongoose.model("Company", CompanySchema);