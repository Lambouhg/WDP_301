//models/user.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkId: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    name: { type: String },
    avatar: { type: String },
    role: { type: String, enum: ["admin", "company", "user"], default: "user" },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", default: null }, // Chỉ có nếu role là "company"
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }] // Danh sách job đã apply
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
