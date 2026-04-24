import express from "express";
import { getQuestions, submitExam } from "../controllers/exam.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// GET /api/exam/questions
router.get("/questions", getQuestions);

// ✅ NEW: Submit Exam API
router.post("/submit", authMiddleware, submitExam);

export default router;