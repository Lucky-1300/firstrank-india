const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// root route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// test route
app.get("/api/test", (req, res) => {
  res.send("API is working 🚀");
});

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

module.exports = app;