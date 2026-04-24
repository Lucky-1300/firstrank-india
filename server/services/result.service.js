import Result from "../models/result.model.js";

const getComparableTime = (result) => {
	if (typeof result?.timeTaken === "number" && result.timeTaken > 0) {
		return result.timeTaken;
	}

	return Number.MAX_SAFE_INTEGER;
};

const cleanText = (value) => String(value || "").trim();

const getLeaderboardPipeline = ({ city, state } = {}) => {
	const pipeline = [
		{
			$match: {
				userId: { $ne: null },
			},
		},
		{
			$sort: {
				createdAt: -1,
			},
		},
		{
			$lookup: {
				from: "users",
				localField: "userId",
				foreignField: "_id",
				as: "user",
			},
		},
		{
			$unwind: "$user",
		},
	];

	if (city) {
		pipeline.push({
			$match: {
				"user.city": {
					$regex: new RegExp(`^${city.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i"),
				},
			},
		});
	}

	if (state) {
		pipeline.push({
			$match: {
				"user.state": {
					$regex: new RegExp(`^${state.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i"),
				},
			},
		});
	}

	pipeline.push(
		{
			$group: {
				_id: "$userId",
				result: { $first: "$$ROOT" },
			},
		},
		{
			$replaceRoot: { newRoot: "$result" },
		},
		{
			$sort: {
				score: -1,
				timeTaken: 1,
				createdAt: 1,
			},
		}
	);

	return pipeline;
};

const formatResult = (result) => {
	if (!result) {
		return null;
	}

	const plainResult = typeof result.toObject === "function" ? result.toObject() : result;
	const user =
		(plainResult.user && typeof plainResult.user === "object" ? plainResult.user : null) ||
		(plainResult.userId && typeof plainResult.userId === "object" ? plainResult.userId : null);

	return {
		id: plainResult._id,
		userId: user?._id || plainResult.userId || null,
		name: user?.name || plainResult.name || null,
		email: user?.email || plainResult.email || null,
		city: user?.city || plainResult.city || null,
		state: user?.state || plainResult.state || null,
		answers: plainResult.answers || [],
		correctCount: plainResult.correctCount ?? plainResult.score ?? 0,
		score: plainResult.score ?? 0,
		total: plainResult.total ?? plainResult.answers?.length ?? 0,
		timeTaken: plainResult.timeTaken ?? 0,
		sectionScores: plainResult.sectionScores || plainResult.categoryScore || {},
		user: user
			? {
				id: user._id || null,
				name: user.name || null,
				email: user.email || null,
				city: user.city || null,
				state: user.state || null,
			}
			: null,
		createdAt: plainResult.createdAt,
		updatedAt: plainResult.updatedAt,
	};
};

const getUserResult = async (userId) => {
	if (!userId) {
		throw new Error("User ID is required");
	}

	const result = await Result.findOne({ userId }).sort({ createdAt: -1 });

	if (!result) {
		throw new Error("Result not found");
	}

	return formatResult(result);
};

const getLeaderboard = async ({ limit = 10, city = null, state = null } = {}) => {
	const results = await Result.aggregate(getLeaderboardPipeline({ city, state })).limit(limit);

	return results.map((result, index) => ({
		rank: index + 1,
		...formatResult(result),
	}));
};

const getUserRanking = async (userId) => {
	if (!userId) {
		throw new Error("User ID is required");
	}

	const leaderboard = await getLeaderboard({ limit: 10000 });
	const userRank = leaderboard.find((entry) => String(entry.userId?._id || entry.userId) === String(userId));

	if (!userRank) {
		throw new Error("Ranking not found");
	}

	return userRank;
};

const getRankingSummary = async ({ city = null, state = null, limit = 10 } = {}) => {
	const safeCity = cleanText(city);
	const safeState = cleanText(state);
	const data = await getLeaderboard({
		limit,
		city: safeCity || null,
		state: safeState || null,
	});

	return {
		filters: {
			city: safeCity || null,
			state: safeState || null,
		},
		count: data.length,
		data,
	};
};

const getNationalRanking = async ({ limit = 10 } = {}) => getRankingSummary({ limit });

const getCityRanking = async ({ city, limit = 10 } = {}) => getRankingSummary({ city, limit });

const getStateRanking = async ({ state, limit = 10 } = {}) => getRankingSummary({ state, limit });

export {
	formatResult,
	getLeaderboard,
	getUserRanking,
	getComparableTime,
	getUserResult,
	getNationalRanking,
	getCityRanking,
	getStateRanking,
};
