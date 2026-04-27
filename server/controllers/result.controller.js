import { getUserResultReport } from "../services/result.service.js";

const fetchUserResult = async (req, res) => {
  try {
    const { userId } = req.params;

    // AUTH CHECK
    if (String(req.user?.id) !== String(userId)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
        data: null,
        error: { code: "FORBIDDEN" },
      });
    }

    // SERVICE CALL
    const result = await getUserResultReport(userId);

    return res.status(200).json({
      success: true,
      message: "User result fetched successfully",
      data: result,
      error: null,
    });

  } catch (error) {
    const statusCode =
      error.message === "Result not found"
        ? 404
        : error.message === "User not found"
        ? 404
        : 400;

    const errorCode =
      error.message === "Result not found"
        ? "NOT_FOUND"
        : error.message === "User not found"
        ? "USER_NOT_FOUND"
        : "BAD_REQUEST";

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to fetch user result",
      data: null,
      error: { code: errorCode },
    });
  }
};

const fetchPremiumReport = async (req, res) => {
  try {
    const { userId } = req.params;

    if (String(req.user?.id) !== String(userId)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
        data: null,
        error: { code: "FORBIDDEN" },
      });
    }

    const result = await getUserResultReport(userId, {
      requirePremium: true,
    });

    return res.status(200).json({
      success: true,
      message: "Premium report fetched successfully",
      data: result,
      error: null,
    });

  } catch (error) {
    const statusCode =
      error.message === "Result not found"
        ? 404
        : error.message === "User not found"
        ? 404
        : error.message === "Premium subscription required"
        ? 402
        : 400;

    const errorCode =
      error.message === "Result not found"
        ? "NOT_FOUND"
        : error.message === "User not found"
        ? "USER_NOT_FOUND"
        : error.message === "Premium subscription required"
        ? "UPGRADE_REQUIRED"
        : "BAD_REQUEST";

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to fetch premium report",
      data: null,
      error: { code: errorCode },
    });
  }
};

export { fetchUserResult, fetchPremiumReport };