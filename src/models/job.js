//models/jobs.js
// src/models/job.js
import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },  // Job title
    employmentType: { 
      type: String, 
      enum: ["Full-Time", "Part-Time", "Remote", "Internship", "Contract"], 
      required: true 
    },  // Type of Employment
    salaryMin: { type: Number, required: true },
    salaryMax: { type: Number, required: true },
    categories: { type: [String], required: true },  // Categories
    requiredSkills: { type: [String], required: true },  // Required Skills
    jobDescription: { type: String, required: true },  // Job Descriptions
    responsibilities: { type: String, required: true },  // Responsibilities
    whoYouAre: { type: String, required: true },  // Who You Are
    niceToHaves: { type: String },  // Nice-To-Haves
    perksAndBenefits: { 
      type: [String], 
      enum: ["Full Healthcare", "Unlimited Vacation", "Skill Development"], 
      default: [] 
    },  // Perks and Benefits
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },  // Reference to the Company
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
