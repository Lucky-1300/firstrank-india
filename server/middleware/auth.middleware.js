import { verifyToken } from "../utils/jwt.utils.js";
import { createAppError } from "../utils/appError.js";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw createAppError("No token provided", 401, "UNAUTHORIZED");
    }

    const [scheme, token] = authHeader.trim().split(/\s+/);
    if (scheme !== "Bearer" || !token) {
      throw createAppError("Invalid token format", 401, "UNAUTHORIZED");
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return next(error);
  }
};

export default authMiddleware;