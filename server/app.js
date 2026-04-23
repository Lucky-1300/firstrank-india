const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const examRoutes = require("./routes/exam.routes"); // ✅ ADD THIS

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

// auth routes
app.use("/api/auth", authRoutes);

// ✅ exam routes (IMPORTANT)
app.use("/api/exam", examRoutes);

module.exports = app;