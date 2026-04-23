import express from "express";
import { getQuestions } from "../controllers/exam.controller.js";

const router = express.Router();

// GET /api/exam/questions
router.get("/questions", getQuestions);

export default router;