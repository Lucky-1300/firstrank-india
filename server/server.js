import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import examRoutes from "./routes/exam.routes.js"; // ✅ ADD THIS
import resultRoutes from "./routes/result.routes.js";
import rankingRoutes from "./routes/ranking.routes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

// DB Connection
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/exam", examRoutes); // ✅ ADD THIS
app.use("/api/result", resultRoutes);
app.use("/api/ranking", rankingRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});