import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: "https://jobly-smart-job-portal.vercel.app",
    credentials: true,
  })
);

const PORT = process.env.PORT || 8000;

// Database
connectDB();

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Health Check
app.get("/", (req, res) => {
  res.send("Backend Running Successfully 🚀");
});

// Server
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});