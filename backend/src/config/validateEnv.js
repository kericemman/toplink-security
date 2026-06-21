const requiredInAllEnvironments = ["MONGO_URI", "JWT_SECRET"];
const requiredInProduction = [
  "CLIENT_URL",
  "PAYSTACK_SECRET_KEY",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "RESEND_API_KEY",
  "FROM_EMAIL",
  "ADMIN_EMAIL",
];

const validateEnv = () => {
  const required = [
    ...requiredInAllEnvironments,
    ...(process.env.NODE_ENV === "production" ? requiredInProduction : []),
  ];
  const missing = required.filter((key) => !process.env[key]?.trim());

  if (missing.length) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  if (
    process.env.DOWNLOAD_TOKEN_SECRET &&
    process.env.DOWNLOAD_TOKEN_SECRET === process.env.JWT_SECRET
  ) {
    throw new Error("DOWNLOAD_TOKEN_SECRET must differ from JWT_SECRET");
  }
};

module.exports = validateEnv;
