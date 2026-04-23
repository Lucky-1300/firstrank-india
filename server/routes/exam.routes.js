import express from "express";
import { getQuestions, submitExam } from "../controllers/exam.controller.js";

const router = express.Router();

// GET /api/exam/questions
router.get("/questions", getQuestions);

// ✅ NEW: Submit Exam API
router.post("/submit", submitExam);

export default router;