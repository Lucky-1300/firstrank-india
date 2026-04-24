import { getUserResult } from "../services/result.service.js";

const fetchUserResult = async (req, res) => {
	try {
		const { userId } = req.params;
		const result = await getUserResult(userId);

		return res.status(200).json({
			success: true,
			message: "User result fetched successfully",
			data: result,
		});
	} catch (error) {
		const statusCode = error.message === "Result not found" ? 404 : 400;

		return res.status(statusCode).json({
			success: false,
			message: error.message || "Failed to fetch user result",
		});
	}
};

export { fetchUserResult };
