const dotenv = require("dotenv");
const connectDB = require("../config/db");
const User = require("../models/User");

dotenv.config();

connectDB();

const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be configured before seeding an admin");
    }

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
      password: adminPassword,
      role: "admin",
    });

    console.log("Admin user created successfully");
    console.log(`Email: ${adminEmail}`);
    console.log("Use the configured ADMIN_PASSWORD and change it after first login.");

    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

seedAdmin();
