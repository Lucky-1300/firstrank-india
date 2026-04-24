import express from "express";
import {
	fetchCityRanking,
	fetchNationalRanking,
	fetchStateRanking,
	fetchUserRanking,
} from "../controllers/ranking.controller.js";

const router = express.Router();

// GET /api/ranking/national
router.get("/national", fetchNationalRanking);

// GET /api/ranking/city/:city
router.get("/city/:city", fetchCityRanking);

// GET /api/ranking/state/:state
router.get("/state/:state", fetchStateRanking);

// GET /api/ranking/user/:userId
router.get("/user/:userId", fetchUserRanking);

// Backward-compatible default national endpoint
router.get("/", fetchNationalRanking);

export default router;