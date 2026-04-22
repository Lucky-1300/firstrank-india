import express from "express";
const router = express.Router();

import { registerUser, loginUser } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

// Register
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, (req, res) => {
	return res.status(200).json({
		success: true,
		message: "Protected route accessed",
		user: req.user,
	});
});


export default router;