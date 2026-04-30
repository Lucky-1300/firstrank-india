import { login, register } from "../services/auth.service.js";
import { createAppError } from "../utils/appError.js";
import { generateToken } from "../utils/jwt.utils.js";

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, mobile, city, state } = req.body;

    if (!name || !email || !password) {
      throw createAppError("Name, email and password required", 400, "BAD_REQUEST");
    }

    const result = await register({ name, email, password, mobile, city, state });
    const token = generateToken(
      { id: result.data.id, email: result.data.email },
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      message: result.message,
      user: result.data,
      token,
      data: result.data,
      error: null,
    });
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw createAppError("Email and password required", 400, "BAD_REQUEST");
    }

    const result = await login(email, password);

    const token = generateToken(
      { id: result.data.id, email: result.data.email },
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: result.message,
      user: result.data,
      data: result.data,
      token,
      error: null,
    });
  } catch (error) {
    return next(error);
  }
};

export { registerUser, loginUser };


