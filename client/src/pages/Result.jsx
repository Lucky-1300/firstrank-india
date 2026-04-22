import Card from "../components/Card";
import Button from "../components/Button";
import { Link, useLocation } from "react-router-dom";
import { Trophy, TrendingUp, Zap, Award } from "lucide-react";

export default function Result() {
  const location = useLocation();
  const score = location.state?.score || 92;

  const skills = [
    ["Problem Solving", 85],
    ["Logical Reasoning", 92],
    ["Communication", 74],
    ["Critical Thinking", 88],
  ];

  const stats = [
    { label: "National Rank", value: "#5", icon: Trophy },
    { label: "Percentile", value: "95%", icon: Award },
    { label: "Questions Correct", value: "23/25", icon: TrendingUp },
    { label: "Time Used", value: "24 min", icon: Zap },
  ];

  const careers = [
    "Data Analyst",
    "Consultant",
    "Product Manager",
    "Business Strategist",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-10 lg:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <section className="text-center mb-8 sm:mb-10">
          <p className="text-orange-500 text-xs sm:text-sm font-bold uppercase tracking-[0.25em]">
            Results
          </p>

          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900">
            🎉 Test Completed
          </h1>

          <p className="mt-4 text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Congratulations! Here is your detailed performance report and insights.
          </p>
        </section>

        {/* Score Card - Hero Section */}
        <section className="mb-8 sm:mb-10">
          <Card className="text-center bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 text-white py-10 sm:py-14 shadow-lg">
            <p className="text-sm sm:text-base opacity-90 uppercase tracking-widest">
              Your Final Score
            </p>

            <h2 className="mt-6 text-7xl sm:text-8xl font-black">
              {score}%
            </h2>

            <div className="mt-6 space-y-3">
              <p className="text-base sm:text-lg opacity-95">
                ✓ Higher than 95% of students
              </p>

              <div className="inline-block px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 font-semibold">
                🏆 Rank #5 Nationally
              </div>
            </div>
          </Card>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {stats.map(({ label, value, icon: Icon }, i) => (
            <Card key={i} className="text-center hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-3">
                <Icon className="text-orange-500" size={24} />
              </div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                {label}
              </p>
              <h3 className="mt-2 text-2xl sm:text-3xl font-black text-orange-600">
                {value}
              </h3>
            </Card>
          ))}
        </section>

        {/* Skills & Careers Grid */}
        <section className="grid lg:grid-cols-2 gap-6 mb-8 sm:mb-10">

          {/* Skill Breakdown */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="text-orange-500" size={24} />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
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
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
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
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Award className="text-orange-500" size={24} />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Recommended Careers
              </h3>
            </div>

            <div className="space-y-3">
              {careers.map((career, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200 hover:border-orange-300 transition"
                >
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="font-medium text-gray-800 text-sm sm:text-base">
                    {career}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs sm:text-sm text-gray-500">
              These careers align with your skill strengths
            </p>
          </Card>
        </section>

        {/* Action Buttons */}
        <section className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
          <Button size="lg" className="w-full sm:w-auto">
            📥 Download Report
          </Button>

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