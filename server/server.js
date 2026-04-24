import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import examRoutes from "./routes/exam.routes.js"; // ✅ ADD THIS
import resultRoutes from "./routes/result.routes.js";
import rankingRoutes from "./routes/ranking.routes.js";
import cors from "cors";
import { errorMiddleware, notFoundMiddleware } from "./middleware/error.middleware.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.disable("x-powered-by");
app.use(cors());

// Middleware
app.use(express.json());

app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "OK",
    data: {
      status: "healthy",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
    error: null,
  });
});

app.get("/api/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "API healthy",
    data: {
      status: "healthy",
      dbState: mongoose.connection.readyState,
      timestamp: new Date().toISOString(),
    },
    error: null,
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/result", resultRoutes);
app.use("/api/ranking", rankingRoutes);
app.use("/api/exam", examRoutes); 

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = Number(process.env.PORT) || 3000;

let serverInstance = null;

const shutdown = async (signal) => {
  console.log(`${signal} received, shutting down gracefully...`);

  if (serverInstance) {
    await new Promise((resolve) => serverInstance.close(resolve));
  }

  await mongoose.connection.close();
  process.exit(0);
};

const startServer = async () => {
  await connectDB();

  serverInstance = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("unhandledRejection", async (error) => {
  console.error("Unhandled Rejection:", error);
  await shutdown("unhandledRejection");
});

startServer().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});