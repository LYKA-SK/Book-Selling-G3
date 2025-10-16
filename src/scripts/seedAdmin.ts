// quick script - run with ts-node
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { connectDB } from "../config/db";
import { User } from "../models/User";

(async function seed() {
  const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!MONGO_URI) {
    console.error("Missing MongoDB URI. Set MONGODB_URI in your .env or environment variables.");
    process.exit(1);
  }
  await connectDB(MONGO_URI);
  const exists = await User.findOne({ email: "admin@readable.test" });
  if (!exists) {
    await User.create({ name: "Admin", email: "admin@readable.test", password: "admin123", role: "admin" });
    console.log("Admin created");
  } else {
    console.log("Admin already exists");
  }
  process.exit(0);
})();
