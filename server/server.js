import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import startupRoutes from "./routes/startupRoutes.js";

const app = express(); // MUST be before app.use()

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/startups", startupRoutes);

// PORT
const PORT = process.env.PORT || 5000;

// Connect to MongoDB first
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    // Start server only after DB connects
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
