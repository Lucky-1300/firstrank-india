import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();



const app = express();
app.use(cors())

// DB Connection
// connectDB();


// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
});