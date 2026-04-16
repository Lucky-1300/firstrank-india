const authService = require("../services/authService");

// ✅ REGISTER (Day 3)
const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required ❌",
    });
  }

  const response = authService.register({ name, email, password });

  res.status(201).json(response);
};

// ✅ LOGIN (Day 4)
const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required ❌",
    });
  }

  const response = authService.login({ email, password });

  res.status(200).json(response);
};

module.exports = { registerUser, loginUser };