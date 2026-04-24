import express from "express";
import { fetchUserResult } from "../controllers/result.controller.js";

const router = express.Router();

// GET /api/result/:userId
router.get("/:userId", fetchUserResult);

export default router;
