import Result from "../models/result.model.js";

const getUserResult = async (userId) => {
	if (!userId) {
		throw new Error("User ID is required");
	}

	const result = await Result.findOne({ userId }).sort({ createdAt: -1 });

	if (!result) {
		throw new Error("Result not found");
	}

	return result;
};

export { getUserResult };
