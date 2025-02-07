import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return; // Nếu đã kết nối thì không cần kết nối lại
  }
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Kết nối MongoDB thành công!");
  } catch (error) {
    console.error("❌ Lỗi kết nối MongoDB:", error);
    throw new Error("Không thể kết nối MongoDB");
  }
}
