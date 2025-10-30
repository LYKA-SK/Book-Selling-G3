// Script to check users in database
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { connectDB } from "../config/db";
import  User  from "../models/UserModel";

(async function checkUsers() {
  const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!MONGO_URI) {
    console.error("Missing MongoDB URI");
    process.exit(1);
  }
  
  await connectDB(MONGO_URI);
  
  console.log("📊 Checking users in database...\n");
  
  const users = await User.find({});
  console.log(`Total users: ${users.length}\n`);
  
  users.forEach((user, index) => {
    console.log(`User ${index + 1}:`);
    console.log(`  - ID: ${user._id}`);
    console.log(`  - Name: ${user.username}`);
    console.log(`  - Email: ${user.email}`);
    console.log(`  - Role: ${user.role}`);
    console.log(`  - Password Hash: ${user.password.substring(0, 20)}...`);
    console.log("");
  });
  
  // Check specifically for admin
  const admin = await User.findOne({ email: "admin@readable.test" });
  if (admin) {
    console.log("✅ Admin user found!");
    console.log(`   Email: ${admin.email}`);
    console.log(`   Role: ${admin.role}`);
  } else {
    console.log("❌ Admin user NOT found!");
  }
  
  await mongoose.connection.close();
  process.exit(0);
})();