import {
	getCityRanking,
	getNationalRanking,
	getStateRanking,
	getUserRanking,
} from "../services/result.service.js";

const getValidLimit = (rawLimit) => {
	const parsed = Number(rawLimit || 10);
	if (!Number.isFinite(parsed) || parsed < 1) {
		return 10;
	}

	return Math.min(Math.floor(parsed), 100);
};

const fetchNationalRanking = async (req, res) => {
	try {
		const limit = getValidLimit(req.query.limit);
		const data = await getNationalRanking({ limit });

		return res.status(200).json({
			success: true,
			message: "National ranking fetched successfully",
			data,
			error: null,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message || "Failed to fetch national ranking",
			data: null,
			error: {
				code: "INTERNAL_SERVER_ERROR",
			},
		});
	}
};

const fetchCityRanking = async (req, res) => {
	try {
		const { city } = req.params;
		const limit = getValidLimit(req.query.limit);
		const data = await getCityRanking({ city, limit });

		return res.status(200).json({
			success: true,
			message: "City ranking fetched successfully",
			data,
			error: null,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message || "Failed to fetch city ranking",
			data: null,
			error: {
				code: "INTERNAL_SERVER_ERROR",
			},
		});
	}
};

const fetchStateRanking = async (req, res) => {
	try {
		const { state } = req.params;
		const limit = getValidLimit(req.query.limit);
		const data = await getStateRanking({ state, limit });

		return res.status(200).json({
			success: true,
			message: "State ranking fetched successfully",
			data,
			error: null,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message || "Failed to fetch state ranking",
			data: null,
			error: {
				code: "INTERNAL_SERVER_ERROR",
			},
		});
	}
};

const fetchUserRanking = async (req, res) => {
	try {
		const { userId } = req.params;

		if (String(req.user?.id) !== String(userId)) {
			return res.status(403).json({
				success: false,
				message: "Access denied",
				data: null,
				error: {
					code: "FORBIDDEN",
				},
			});
		}

		const data = await getUserRanking(userId);

		return res.status(200).json({
			success: true,
			message: "User ranking fetched successfully",
			data,
			error: null,
		});
	} catch (error) {
		const statusCode = error.message === "Ranking not found" ? 404 : 400;
		const errorCode = error.message === "Ranking not found" ? "NOT_FOUND" : "BAD_REQUEST";

		return res.status(statusCode).json({
			success: false,
			message: error.message || "Failed to fetch user ranking",
			data: null,
			error: {
				code: errorCode,
			},
		});
	}
};

export {
	fetchNationalRanking,
	fetchCityRanking,
	fetchStateRanking,
	fetchUserRanking,
};