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

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

export default function Result() {
  const location = useLocation();
  const { user: authUser } = useAuth();
  const storedUser = getStoredUser();
  const sessionUser = authUser || storedUser;
  const studentName = location.state?.studentName || sessionUser?.name || "Student";
  const studentEmail = location.state?.studentEmail || sessionUser?.email || "";
  const [resultData, setResultData] = useState(location.state?.resultData || null);
  const [loading, setLoading] = useState(!location.state?.resultData);
  const [error, setError] = useState("");

  const score = resultData?.report?.score ?? location.state?.score ?? 0;
  const correctCount = resultData?.report?.correctCount ?? location.state?.correctCount ?? 0;
  const totalQuestions = resultData?.report?.total ?? location.state?.totalQuestions ?? 29;
  const sectionScores = resultData?.report?.sectionScores || location.state?.sectionScores || {};
  const rank = resultData?.rank ?? location.state?.rank ?? null;

  const scorePercent = Math.round(score);

  useEffect(() => {
    const loadResult = async () => {
      const token = localStorage.getItem("authToken");
      const userId = sessionUser?.id || localStorage.getItem("userId");

      if (!userId || resultData) {
        setLoading(false);
        return;
      }

      if (!token) {
        setError("Please log in to view your result.");
        setLoading(false);
        return;
      }

      try {
        const response = await apiCall(`/result/${userId}`, { method: "GET" });
        if (response.success) {
          setResultData(response.data);
        } else {
          setError(response.message || "Failed to load result");
        }
      } catch (err) {
        setError(err?.message || "Failed to load result");
      } finally {
        setLoading(false);
      }
    };

    loadResult();
  }, [resultData, sessionUser?.id]);

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

          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900">
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