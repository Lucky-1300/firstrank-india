import express from "express";
const router = express.Router();

import { registerUser, loginUser } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import User from "../models/user.model.js";

// Register
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id).select("-password");

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
				data: null,
				error: { code: "USER_NOT_FOUND" },
			});
		}

		return res.status(200).json({
			success: true,
			message: "Protected route accessed",
			data: {
				id: user._id,
				name: user.name,
				email: user.email,
				mobile: user.mobile,
				city: user.city,
				state: user.state,
				category: user.category || "student",
				isPremium: user.isPremium,
				premiumExpiresAt: user.premiumExpiresAt,
			},
			error: null,
		});
	} catch (error) {
		next(error);
	}
});


export default router;