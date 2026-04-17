const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

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

//auth route 
app.use("/api/auth", authRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

module.exports = app;