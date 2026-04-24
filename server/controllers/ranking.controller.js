import {
	getCityRanking,
	getNationalRanking,
	getStateRanking,
	getUserRanking,
} from "../services/result.service.js";

const fetchNationalRanking = async (req, res) => {
	try {
		const limit = Number(req.query.limit || 10);
		const data = await getNationalRanking({ limit });

		return res.status(200).json({
			success: true,
			message: "National ranking fetched successfully",
			data,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message || "Failed to fetch national ranking",
		});
	}
};

const fetchCityRanking = async (req, res) => {
	try {
		const { city } = req.params;
		const limit = Number(req.query.limit || 10);
		const data = await getCityRanking({ city, limit });

		return res.status(200).json({
			success: true,
			message: "City ranking fetched successfully",
			data,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message || "Failed to fetch city ranking",
		});
	}
};

const fetchStateRanking = async (req, res) => {
	try {
		const { state } = req.params;
		const limit = Number(req.query.limit || 10);
		const data = await getStateRanking({ state, limit });

		return res.status(200).json({
			success: true,
			message: "State ranking fetched successfully",
			data,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message || "Failed to fetch state ranking",
		});
	}
};

const fetchUserRanking = async (req, res) => {
	try {
		const { userId } = req.params;
		const data = await getUserRanking(userId);

		return res.status(200).json({
			success: true,
			message: "User ranking fetched successfully",
			data,
		});
	} catch (error) {
		const statusCode = error.message === "Ranking not found" ? 404 : 400;

		return res.status(statusCode).json({
			success: false,
			message: error.message || "Failed to fetch user ranking",
		});
	}
};

export {
	fetchNationalRanking,
	fetchCityRanking,
	fetchStateRanking,
	fetchUserRanking,
};