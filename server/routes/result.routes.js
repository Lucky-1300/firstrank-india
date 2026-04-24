import express from "express";
import { fetchPremiumReport, fetchUserResult } from "../controllers/result.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// GET /api/result/:userId/premium
router.get("/:userId/premium", authMiddleware, fetchPremiumReport);

// GET /api/result/:userId
router.get("/:userId", authMiddleware, fetchUserResult);

export default router;
