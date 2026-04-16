import express from "express";
const router = express.Router();

import { registerUser, loginUser } from "../controllers/authController.js";

// Register
router.post("/register", registerUser);
router.post("/login", loginUser);

// Login
router.post("/login", loginUser);

export default router;