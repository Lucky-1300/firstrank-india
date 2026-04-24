import jwt from "jsonwebtoken";
import { createAppError } from "./appError.js";

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw createAppError("JWT secret is not configured", 500, "CONFIG_ERROR");
  }

  return process.env.JWT_SECRET;
};

const generateToken = (payload, options = {}) => {
  const secret = getJwtSecret();
  return jwt.sign(payload, secret, { expiresIn: "7d", ...options });
};

const verifyToken = (token) => {
  try {
    const secret = getJwtSecret();
    return jwt.verify(token, secret);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw createAppError("Token expired", 401, "TOKEN_EXPIRED");
    }

    if (error.name === "JsonWebTokenError") {
      throw createAppError("Invalid token", 401, "INVALID_TOKEN");
    }

    throw createAppError("Token verification failed", 401, "UNAUTHORIZED");
  }
};

export { generateToken, verifyToken };