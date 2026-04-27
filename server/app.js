import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import examRoutes from "./routes/exam.routes.js";
import resultRoutes from "./routes/result.routes.js";

const app = express();


app.use(cors());
app.use(express.json());

// root route
app.get("/", (req, res) => {
  res.send("Backend is running ");
});

// test route
app.get("/api/test", (req, res) => {
  res.send("API is working ");
});

// register API
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  res.json({
    message: "User registered successfully",
    user: { name, email },
  });
});

// login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  res.json({
    message: "Login successful",
    token: "demo_token_123",
  });
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/result", resultRoutes); // ✅ FIX HERE

module.exports = app;