import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
    jobID: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    companyID: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    currentJobTitle: { type: String },
    linkedinURL: { type: String },
    portfolioURL: { type: String },
    additionalInfo: { type: String, maxlength: 500 },
    resume: { type: String },
    status: { type: String, enum: ["In review", "Shortlisted", "Interview", "Hired"], default: "In review" }
}, { timestamps: true });

export default mongoose.models.Applicant || mongoose.model("Applicant", applicantSchema);
