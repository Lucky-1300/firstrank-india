import Result from "../models/result.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

const getComparableTime = (result) => {
  if (typeof result?.timeTaken === "number" && result.timeTaken > 0) {
    return result.timeTaken;
  }

  return Number.MAX_SAFE_INTEGER;
};

const cleanText = (value) => String(value || "").trim();
const FALLBACK_RANKING_TIME = Number.MAX_SAFE_INTEGER;
const normalizeRankingTime = (value) =>
  typeof value === "number" && Number.isFinite(value) && value > 0
    ? value
    : FALLBACK_RANKING_TIME;

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
          $regex: new RegExp(
            `^${city.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
            "i",
          ),
        },
      },
    });
  }

  if (state) {
    pipeline.push({
      $match: {
        "user.state": {
          $regex: new RegExp(
            `^${state.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
            "i",
          ),
        },
      },
    });
  }

  pipeline.push(
    {
      $addFields: {
        rankingTime: {
          $cond: [
            { $gt: ["$timeTaken", 0] },
            "$timeTaken",
            FALLBACK_RANKING_TIME,
          ],
        },
      },
    },
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
        rankingTime: 1,
        createdAt: 1,
      },
    },
  );

  return pipeline;
};

const formatResult = (result) => {
  if (!result) {
    return null;
  }

  const plainResult =
    typeof result.toObject === "function" ? result.toObject() : result;
  const user =
    (plainResult.user && typeof plainResult.user === "object"
      ? plainResult.user
      : null) ||
    (plainResult.userId && typeof plainResult.userId === "object"
      ? plainResult.userId
      : null);

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
    rankingTime: normalizeRankingTime(plainResult.timeTaken),
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

const isPremiumUser = (user) => {
  if (!user?.isPremium) {
    return false;
  }

  if (!user.premiumExpiresAt) {
    return true;
  }

  return new Date(user.premiumExpiresAt) > new Date();
};

const buildLimitedReport = (result) => {
  const safeSectionScores = result.sectionScores || {};

  return {
    reportType: "limited",
    score: result.score,
    total: result.total,
    timeTaken: result.timeTaken,
    sections: Object.keys(safeSectionScores),
    lockedFields: ["answers", "sectionScores"],
  };
};

const buildFullReport = (result) => ({
  reportType: "full",
  ...result,
});

const getUserResultReport = async (userId, options = {}) => {
  const { requirePremium = false } = options;

  if (!userId) {
    throw new Error("User ID is required");
  }

  const [resultDoc, userDoc] = await Promise.all([
    Result.findOne({ userId }).sort({ createdAt: -1 }),
    User.findById(userId).select(
      "name email city state isPremium premiumExpiresAt",
    ),
  ]);

  if (!resultDoc) {
    throw new Error("Result not found");
  }

  if (!userDoc) {
    throw new Error("User not found");
  }

  const formattedResult = formatResult({
    ...resultDoc.toObject(),
    userId: userDoc,
  });

  const premiumActive = isPremiumUser(userDoc);

  if (requirePremium && !premiumActive) {
    throw new Error("Premium subscription required");
  }

  return {
    isPremium: premiumActive,
    plan: premiumActive ? "premium" : "free",
    report: premiumActive
      ? buildFullReport(formattedResult)
      : buildReportStructure(formattedResult),
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

const getLeaderboard = async ({
  limit = 10,
  city = null,
  state = null,
} = {}) => {
  const results = await Result.aggregate(
    getLeaderboardPipeline({ city, state }),
  )
    .limit(limit)
    .allowDiskUse(true);

  return results.map((result, index) => ({
    rank: index + 1,
    ...formatResult(result),
  }));
};

const getUserRanking = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const latestUserResult = await Result.findOne({ userId })
    .sort({ createdAt: -1 })
    .select(
      "_id userId score timeTaken createdAt sectionScores categoryScore correctCount total",
    )
    .lean();

  if (!latestUserResult) {
    throw new Error("Ranking not found");
  }

  const normalizedTime = normalizeRankingTime(latestUserResult.timeTaken);

  const [higherRankedCount, userWithProfile] = await Promise.all([
    Result.aggregate([
      { $match: { userId: { $ne: null } } },
      { $sort: { createdAt: -1 } },
      { $group: { _id: "$userId", result: { $first: "$$ROOT" } } },
      { $replaceRoot: { newRoot: "$result" } },
      {
        $addFields: {
          rankingTime: {
            $cond: [
              { $gt: ["$timeTaken", 0] },
              "$timeTaken",
              FALLBACK_RANKING_TIME,
            ],
          },
        },
      },
      {
        $match: {
          $or: [
            { score: { $gt: latestUserResult.score || 0 } },
            {
              score: latestUserResult.score || 0,
              rankingTime: { $lt: normalizedTime },
            },
            {
              score: latestUserResult.score || 0,
              rankingTime: normalizedTime,
              createdAt: { $lt: latestUserResult.createdAt },
            },
          ],
        },
      },
      { $count: "count" },
    ]),
    Result.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $sort: { createdAt: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
    ]),
  ]);

  const rank = (higherRankedCount?.[0]?.count || 0) + 1;
  const profileResult = userWithProfile?.[0] || latestUserResult;

  return {
    rank,
    ...formatResult(profileResult),
  };
};

const getRankingSummary = async ({
  city = null,
  state = null,
  limit = 10,
} = {}) => {
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

const getNationalRanking = async ({ limit = 10 } = {}) =>
  getRankingSummary({ limit });

const getCityRanking = async ({ city, limit = 10 } = {}) =>
  getRankingSummary({ city, limit });

const getStateRanking = async ({ state, limit = 10 } = {}) =>
  getRankingSummary({ state, limit });

const buildReportStructure = (result) => {
  const total = result.total || 0;
  const correct = result.correctCount || 0;

  const sections = {};

  if (result.sectionScores) {
    for (const key in result.sectionScores) {
      const value = result.sectionScores[key];

      const score = typeof value === "number" ? value : value?.score || 0;
      const sectionTotal = value?.total || total;

      sections[key] = {
        score,
        correct: value?.correct || score,
        total: sectionTotal,
        percentage: sectionTotal
          ? Math.round((score / sectionTotal) * 100)
          : 0,
      };
    }
  }

  return {
    reportType: "limited",

    summary: {
      score: result.score,
      correct,
      total,
      percentage: total ? Math.round((correct / total) * 100) : 0,
      timeTaken: result.timeTaken || 0,
    },

    sections,

    categories: result.categoryScore || {},
  };
};

export {
  formatResult,
  getLeaderboard,
  getUserRanking,
  getComparableTime,
  getUserResult,
  getNationalRanking,
  getCityRanking,
  getStateRanking,
  getUserResultReport,
  buildReportStructure,
};
