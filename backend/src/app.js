const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimiter = require("./middlewares/rateLimiter");
const errorMiddleware = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const articleRoutes = require("./routes/articleRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const productRoutes = require("./routes/productRoutes");
const paystackRoutes = require("./routes/paystackRoutes");
const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes");
const consultationRoutes = require("./routes/consultationRoutes");
const trainingRoutes = require("./routes/trainingRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");

require("dotenv").config();

const app = express();

app.use(cors({
  origin: [
    "https://toplinksecurity.com",
    "https://www.toplinksecurity.com"
  ],
  credentials: true
}));

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(rateLimiter);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TopLink Security API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server healthy",
  });
});


app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/products", productRoutes);
app.use("/api/paystack", paystackRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/subscribers", subscriberRoutes);


app.use(errorMiddleware);

module.exports = app;