const jwt = require("jsonwebtoken");

// ✅ REGISTER
const register = (userData) => {
  const { password, ...safeData } = userData;

  return {
    success: true,
    message: "User registered successfully ✅",
    data: safeData,
  };
};

// ✅ LOGIN
const login = (userData) => {
  const { email } = userData;

  const user = {
    id: 1,
    email,
  };

  const token = jwt.sign(user, "secretkey", { expiresIn: "1h" });

  return {
    success: true,
    message: "Login successful ✅",
    data: {
      user,
      token,
    },
  };
};

module.exports = { register, login };