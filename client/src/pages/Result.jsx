import Card from "../components/Card";
import Button from "../components/Button";
import { Link, useLocation } from "react-router-dom";
import {
  Trophy,
  TrendingUp,
  Zap,
  Award,
  MapPin,
  Star,
  BarChart3,
  Brain,
  Users,
  Target,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { apiCall } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";

const LATEST_RESULT_STORAGE_KEY = "latestExamResult";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

const toSafeNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeSectionScores = (sections) => {
  if (!sections || typeof sections !== "object") {
    return {};
  }

  return Object.fromEntries(
    Object.entries(sections).map(([key, value]) => {
      if (typeof value === "number") {
        return [key, value];
      }

      if (typeof value === "object" && value !== null) {
        const score = toSafeNumber(value.score, toSafeNumber(value.correct, 0));
        const total = toSafeNumber(value.total, 0);
        const percentage = toSafeNumber(value.percentage, total > 0 ? Math.round((score / total) * 100) : 0);
        return [key, percentage];
      }

      return [key, 0];
    }),
  );
};

const normalizeResultPayload = (payload) => {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  // Shape from exam submit API: { summary, sections, categories }
  if (payload.summary) {
    return {
      scorePercent: toSafeNumber(payload.summary.percentage, 0),
      correctCount: toSafeNumber(payload.summary.correct, toSafeNumber(payload.summary.score, 0)),
      totalQuestions: toSafeNumber(payload.summary.total, 0),
      sectionScores: normalizeSectionScores(payload.sections || payload.categories || {}),
      rank: payload.rank ?? null,
      raw: payload,
    };
  }

  // Shape from result API: { report, ... }
  if (payload.report) {
    const report = payload.report;

    // Limited report shape: report.summary exists
    if (report.summary) {
      return {
        scorePercent: toSafeNumber(report.summary.percentage, 0),
        correctCount: toSafeNumber(report.summary.correct, toSafeNumber(report.summary.score, 0)),
        totalQuestions: toSafeNumber(report.summary.total, 0),
        sectionScores: normalizeSectionScores(report.sections || report.categories || {}),
        rank: payload.rank ?? null,
        raw: payload,
      };
    }

    // Full report shape
    const correctCount = toSafeNumber(report.correctCount, toSafeNumber(report.score, 0));
    const totalQuestions = toSafeNumber(report.total, 0);
    return {
      scorePercent:
        totalQuestions > 0
          ? Math.round((correctCount / totalQuestions) * 100)
          : toSafeNumber(report.score, 0),
      correctCount,
      totalQuestions,
      sectionScores: normalizeSectionScores(report.sectionScores || report.categories || {}),
      rank: payload.rank ?? null,
      raw: payload,
    };
  }

  // Shape from route state fallback: { score, correctCount, totalQuestions, sectionScores }
  const fallbackScore = toSafeNumber(payload.score, 0);
  return {
    scorePercent: fallbackScore,
    correctCount: toSafeNumber(payload.correctCount, fallbackScore),
    totalQuestions: toSafeNumber(payload.totalQuestions, 0),
    sectionScores: normalizeSectionScores(payload.sectionScores || {}),
    rank: payload.rank ?? null,
    raw: payload,
  };
};

const readLatestCachedResult = (userId) => {
  if (!userId) {
    return null;
  }

  try {
    const raw = localStorage.getItem(LATEST_RESULT_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;

    if (!parsed || String(parsed.userId) !== String(userId)) {
      return null;
    }

    return normalizeResultPayload(parsed.payload);
  } catch {
    return null;
  }
};

const writeLatestCachedResult = (userId, payload) => {
  if (!userId || !payload) {
    return;
  }

  try {
    localStorage.setItem(
      LATEST_RESULT_STORAGE_KEY,
      JSON.stringify({
        userId: String(userId),
        payload,
        updatedAt: new Date().toISOString(),
      }),
    );
  } catch {
    // Ignore storage errors in private mode/quota scenarios.
  }
};

export default function Result() {
  const location = useLocation();
  const { user: authUser } = useAuth();
  const storedUser = getStoredUser();
  const sessionUser = authUser || storedUser;
  const userId = sessionUser?.id || sessionUser?._id || localStorage.getItem("userId");
  const studentName = location.state?.studentName || sessionUser?.name || "Student";
  const studentEmail = location.state?.studentEmail || sessionUser?.email || "";
  const initialResult = useMemo(() => {
    const fromState = normalizeResultPayload(location.state?.resultData || location.state);
    if (fromState) {
      return fromState;
    }

    return readLatestCachedResult(userId);
  }, [location.state, userId]);
  const [latestResult, setLatestResult] = useState(initialResult);
  const [loading, setLoading] = useState(!initialResult);
  const [error, setError] = useState("");

  const score = latestResult?.scorePercent ?? 0;
  const correctCount = latestResult?.correctCount ?? 0;
  const totalQuestions = latestResult?.totalQuestions ?? 29;
  const sectionScores = latestResult?.sectionScores || {};
  const rank = latestResult?.rank ?? null;

  const scorePercent = Math.round(score);

  useEffect(() => {
    if (initialResult) {
      setLatestResult(initialResult);
      setLoading(false);
      setError("");
    }
  }, [initialResult]);

  useEffect(() => {
    const loadResult = async () => {
      const token = localStorage.getItem("authToken");
      const hasLocalResult = Boolean(initialResult);

      if (!userId) {
        setLoading(false);
        return;
      }

      if (hasLocalResult) {
        writeLatestCachedResult(
          userId,
          initialResult.raw || location.state?.resultData || location.state,
        );
      }

      if (!token) {
        if (!hasLocalResult) {
          setError("Please log in to view your result.");
        }
        setLoading(false);
        return;
      }

      try {
        const response = await apiCall(`/result/${userId}`, { method: "GET" });
        if (response.success) {
          const normalized = normalizeResultPayload(response.data);
          if (normalized) {
            setLatestResult(normalized);
            writeLatestCachedResult(userId, response.data);
          }
        } else {
          if (!hasLocalResult) {
            setError(response.message || "Failed to load result");
          }
        }
      } catch (err) {
        if (!hasLocalResult) {
          setError(err?.message || "Failed to load result");
        }
      } finally {
        setLoading(false);
      }
    };

    loadResult();
  }, [initialResult, location.state, userId]);

  const skills = useMemo(() => {
    const entries = Object.entries(sectionScores || {});

    if (entries.length > 0) {
      return entries.map(([name, value]) => [name, Number(value) || 0]);
    }

    return [
      ["Logic", scorePercent],
      ["Decision Making", scorePercent],
      ["Finance", scorePercent],
      ["Leadership", scorePercent],
    ];
  }, [sectionScores, scorePercent]);

  const stats = [
    { label: "City Rank", value: rank ? `#${rank}` : "—", icon: MapPin },
    { label: "State Rank", value: rank ? `#${rank}` : "—", icon: Trophy },
    { label: "National Rank", value: rank ? `#${rank}` : "—", icon: Award },
    { label: "Percentile", value: `${Math.min(100, Math.max(0, scorePercent))}%`, icon: TrendingUp },
  ];

  const careers = [
    "Data Analyst",
    "Consultant",
    "Product Manager",
    "Business Strategist",
  ];

  const reportCards = [
    {
      icon: Brain,
      title: "Personality Insight",
      text:
        scorePercent > 80
          ? "You perform excellently under pressure."
          : "You have good potential but need consistency.",
    },
    {
      icon: Users,
      title: "Team Strength",
      text: "You communicate effectively and can influence group decisions positively.",
    },
    {
      icon: Target,
      title: "Growth Area",
      text: "Your financial reasoning can improve further with regular practice.",
    },
    {
      icon: BarChart3,
      title: "Overall Trend",
      text:
        scorePercent > 75
          ? "You are on a strong growth path."
          : "You need more practice to improve.",
    },
  ];


  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8 sm:py-10 lg:py-14 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {loading && <LoadingSpinner fullScreen label="Loading your result..." />}

        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* Header */}
        <section className="text-center mb-8 sm:mb-10">
          <p className="text-orange-500 text-xs sm:text-sm font-bold uppercase tracking-[0.25em]">
            Results
          </p>

          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white transition-colors duration-300">
            🎉 Report for {studentName}
          </h1>

          {studentEmail && (
            <p className="mt-3 text-sm sm:text-base text-gray-500 dark:text-slate-400 break-all transition-colors duration-300">
              {studentEmail}
            </p>
          )}

          <p className="mt-4 text-sm sm:text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto transition-colors duration-300">
            Congratulations! Here is your detailed performance report and insights.
          </p>
        </section>

        {/* Score Card - Hero Section */}
        <section className="mb-8 sm:mb-10">
          <Card className="relative overflow-hidden text-center bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 text-white py-10 sm:py-14 shadow-lg border-0 hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_white,_transparent_40%)]" />
            <p className="relative text-sm sm:text-base opacity-90 uppercase tracking-widest">
              Your Final Score
            </p>

            <h2 className="relative mt-6 text-6xl sm:text-7xl font-black">
              {scorePercent}%
            </h2>

            <p className="relative mt-2 text-base sm:text-lg opacity-90">
              {correctCount} correct out of {totalQuestions} questions
            </p>

            <div className="relative mt-6 space-y-3">
              <p className="text-base sm:text-lg opacity-95">
                {scorePercent >= 80
                  ? "Excellent! You performed very well."
                  : scorePercent >= 60
                    ? "Good performance! Keep practicing to improve."
                    : "You have potential! Focus on weak areas."}
              </p>

              <div className="inline-block px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 font-semibold">
                🏆 National Rank {rank ? `#${rank}` : "—"}
              </div>
            </div>
          </Card>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {stats.map(({ label, value, icon: Icon }, i) => (
            <Card key={i} className={`text-center hover:shadow-md transition-all duration-300 ${label === "National Rank" ? "ring-2 ring-orange-300 bg-orange-50 dark:bg-orange-500/10" : ""}`}>
              <div className="flex justify-center mb-3">
                <Icon className="text-orange-500" size={24} />
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 font-medium transition-colors duration-300">
                {label}
              </p>
              <h3 className="mt-2 text-2xl sm:text-3xl font-black text-orange-600">
                {value}
              </h3>
            </Card>
          ))}
        </section>

        {/* Rank Section */}
        <section className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {[
            ["City Rank", stats[0].value, "You are among the top students in your city.", false],
            ["State Rank", stats[1].value, "You are in the top group across your state.", false],
            ["National Rank", stats[2].value, "Your current national rank is highlighted here.", true],
          ].map(([label, value, text, highlight]) => (
            <Card
              key={label}
              className={`relative overflow-hidden hover:shadow-lg transition-all duration-300 ${highlight ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg" : ""}`}
            >
              {highlight && <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top_right,_white,_transparent_45%)]" />}
              <p className={`text-sm font-semibold uppercase tracking-widest ${highlight ? "text-white/80" : "text-gray-500 dark:text-slate-400"}`}>
                {label}
              </p>
              <h3 className={`mt-3 text-4xl font-black ${highlight ? "text-white" : "text-orange-600"}`}>
                {value}
              </h3>
              <p className={`mt-3 text-sm leading-7 ${highlight ? "text-white/90" : "text-gray-600 dark:text-slate-300"}`}>
                {text}
              </p>
            </Card>
          ))}
        </section>

        {/* Skills & Careers Grid */}
        <section className="grid lg:grid-cols-2 gap-6 mb-8 sm:mb-10">

          {/* Skill Breakdown */}
          <Card className="shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="text-orange-500" size={24} />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                Skill Breakdown
              </h3>
            </div>

            <div className="space-y-5">
              {skills.map(([name, value], i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700 text-sm sm:text-base">
                      {name}
                    </span>
                    <span className="text-orange-600 font-bold text-sm">
                      {value}%
                    </span>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden transition-colors duration-300">
                    <div
                      className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Career Recommendations */}
          <Card className="shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Award className="text-orange-500" size={24} />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                Recommended Careers
              </h3>
            </div>

            <div className="space-y-3">
              {careers.map((career, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-500/10 rounded-lg border border-orange-200 dark:border-orange-500/20 hover:border-orange-300 transition-all duration-300"
                >
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="font-medium text-gray-800 dark:text-slate-100 text-sm sm:text-base transition-colors duration-300">
                    {career}
                  </span>
                </div>
              ))}
            </div>

              <p className="mt-4 text-xs sm:text-sm text-gray-500 dark:text-slate-400 transition-colors duration-300">
              These careers align with your skill strengths
            </p>
          </Card>
        </section>

        <section className="mb-8 sm:mb-10">
          <Card className="shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="text-orange-500" size={24} />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                Section Scores
              </h3>
            </div>

            <div className="space-y-5">
              {skills.map(([name, value], i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700 dark:text-slate-300 text-sm sm:text-base transition-colors duration-300">
                      {name}
                    </span>
                    <span className="text-orange-600 font-bold text-sm">{value}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden transition-colors duration-300">
                    <div
                      className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Detailed Report Cards */}
        <section className="mb-8 sm:mb-10">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {reportCards.map((item, i) => {
              const Icon = item.icon;
              return (
                <Card key={i} hover className="h-full">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-slate-300 transition-colors duration-300">
                    {item.text}
                  </p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Action Buttons */}
        <section className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
          <Button size="lg" className="w-full sm:w-auto">
            📥 Download Report
          </Button>

          <Link to="/reports" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full">
              📄 View Full Report
            </Button>
          </Link>

          <Link to="/leaderboard" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full">
              🏅 View Rankings
            </Button>
          </Link>

          <Link to="/dashboard" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full">
              📊 Back to Dashboard
            </Button>
          </Link>
        </section>

      </div>
    </main>
  );
}