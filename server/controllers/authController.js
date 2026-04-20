import { register, login } from "../services/authService.js";

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    // if (!name || !email || !password) {
    //   return res.status(400).json({
    //     message: "All fields are required ",
    //   });
    // }
if (!name || !email || !password) {
  return res.status(400).json({
    success: false,
    message: "All fields are required",
  });
}
    
res.status(201).json({
  success: true,
  token: "dummy_token_123",
  user: {
    name,
    email,
  },
});


  } catch (error) {
   res.status(500).json({
  success: false,
  message: error.message || "Something went wrong",
});
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success:false,
        message: "Email and password required ",
      });
    }
    res.status(200).json({
  success: true,
  token: "dummy_token_123",
  user: {
    email,
  },
});


  } catch (error) {
    res.status(500).json({
  success: false,
  message: error.message || "Login failed",
});
  }
};

export { registerUser, loginUser };
