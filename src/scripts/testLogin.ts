// Script to test login functionality
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { connectDB } from "../config/db";
// import { IUser } from "../models/User"; // with curly braces
import User from "../models/UserModel"; // default import

(async function testLogin() {
  const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!MONGO_URI) {
    console.error("Missing MongoDB URI");
    process.exit(1);
  }

  await connectDB(MONGO_URI);

  console.log("🔐 Testing login functionality...\n");

  const email = "admin@readable.test";
  const password = "admin123";

  console.log(`Attempting to login with:`);
  console.log(`  Email: ${email}`);
  console.log(`  Password: ${password}\n`);

  // Find user
  const user = await User.findOne({ email });

  if (!user) {
    console.log("❌ User not found!");
    await mongoose.connection.close();
    process.exit(1);
  }

  console.log("✅ User found in database");
  console.log(`  Name: ${user.username}`);
  console.log(`  Email: ${user.email}`);
  console.log(`  Role: ${user.role}\n`);

  // Test password comparison
  console.log("Testing password comparison...");
  const isMatch = await user.comparePassword(password);

  if (isMatch) {
    console.log("✅ Password matches! Login should work.");
  } else {
    console.log("❌ Password does NOT match! This is the problem.");
  }

  await mongoose.connection.close();
  process.exit(0);
})();
