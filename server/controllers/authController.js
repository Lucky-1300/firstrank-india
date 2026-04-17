import { register, login } from "../services/authService.js";

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required ",
      });
    }

    const response = await register({
      name,
      email,
      password,
      mobile,
    });

    res.status(201).json(response);

  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong ",
    });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required ",
      });
    }

    const response = await login(email, password);

    res.status(200).json(response);

  } catch (error) {
    res.status(500).json({
      message: error.message || "Login failed ",
    });
  }
};

export { registerUser, loginUser };
