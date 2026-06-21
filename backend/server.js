require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./src/config/db");
const validateEnv = require("./src/config/validateEnv");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  validateEnv();
  await connectDB();

  const app = require("./src/app");
  const server = app.listen(PORT, () => {
    console.log(`TopLink backend running on port ${PORT}`);
  });

  const shutdown = async (signal) => {
    console.log(`${signal} received. Shutting down gracefully.`);

    server.close(async () => {
      await mongoose.connection.close();
      process.exit(0);
    });

    setTimeout(() => process.exit(1), 10_000).unref();
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
};

startServer().catch((error) => {
  console.error(`Failed to start server: ${error.message}`);
  process.exit(1);
});
