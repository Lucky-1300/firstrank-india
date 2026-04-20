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



//register APp
app.post("/register", (req, res) => {

  const { name, email, password } = req.body;

  res.json({
    message: "User registered successfully",
    user: { name, email }
  });

});

// login API
app.post("/login", (req, res) => {

  const { email, password } = req.body;

  res.json({
    message: "Login successful",
    token: "demo_token_123"
  });

});




//auth route 
app.use("/api/auth", authRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

module.exports = app;