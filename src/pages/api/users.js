import { connectToDatabase } from "../../lib/mongodb";
import User from "../../models/User";

export default async function handler(req, res) {
  await connectToDatabase();
  const users = await User.find();
  res.status(200).json(users);
}
