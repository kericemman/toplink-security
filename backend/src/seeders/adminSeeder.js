const dotenv = require("dotenv");
const connectDB = require("../config/db");
const User = require("../models/User");

dotenv.config();

connectDB();

const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      existingAdmin.role = "admin";
      await existingAdmin.save();

      console.log("Existing user updated to admin");
      process.exit();
    }

    await User.create({
      name: "TopLink Admin",
      email: adminEmail,
      password: "C.Musanya@2026",
      role: "admin",
    });

    console.log("Admin user created successfully");
    console.log(`Email: ${adminEmail}`);
    console.log("Password: Admin@12345");
    console.log("Change this password after first login.");

    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

seedAdmin();