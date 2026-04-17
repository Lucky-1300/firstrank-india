import Card from "../components/Card";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Result() {
  const score = 92;

  const skills = [
    ["Problem Solving", 85],
    ["Logical Reasoning", 92],
    ["Communication", 74],
    ["Critical Thinking", 88],
  ];

  const stats = [
    ["National Rank", "#5"],
    ["Percentile", "95%"],
    ["Questions Correct", "23/25"],
    ["Time Used", "24 min"],
  ];

  const careers = [
    "Data Analyst",
    "Consultant",
    "Product Manager",
    "Business Strategist",
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-10 lg:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <section className="text-center">
          <p className="text-orange-500 text-xs sm:text-sm font-bold uppercase tracking-[0.25em]">
            Results
          </p>

          <h1 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
            🎉 Test Completed
          </h1>

          <p className="mt-4 text-sm sm:text-lg text-gray-500 max-w-2xl mx-auto">
            Here is your detailed performance report and growth insights.
          </p>
        </section>

        {/* Hero Score Card */}
        <section className="mt-8 sm:mt-10">
          <Card className="text-center bg-gradient-to-r from-orange-500 to-orange-400 text-white py-8 sm:py-10">
            <p className="text-sm sm:text-lg opacity-90">
              Your Final Score
            </p>

            <h2 className="mt-4 text-6xl sm:text-7xl lg:text-8xl font-black">
              {score}%
            </h2>

            <p className="mt-4 text-sm sm:text-lg">
              Higher than 95% of students
            </p>

            <div className="mt-6 inline-block px-5 py-2 rounded-full bg-white/20 text-sm sm:text-base">
              Rank #5 Nationally
            </div>
          </Card>
        </section>

        {/* Stats */}
        <section className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map(([title, value], i) => (
            <Card key={i} className="text-center p-5">
              <p className="text-xs sm:text-sm text-gray-500">
                {title}
              </p>

              <h3 className="mt-2 text-2xl sm:text-3xl font-black text-orange-500">
                {value}
              </h3>
            </Card>
          ))}
        </section>

        {/* Main Grid */}
        <section className="mt-8 sm:mt-10 grid lg:grid-cols-2 gap-6">

          {/* Skills */}
          <Card>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              Skill Breakdown
            </h3>

            <div className="space-y-5 mt-6">
              {skills.map(([name, value], i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700">
                      {name}
                    </span>

                    <span className="text-gray-500">
                      {value}%
                    </span>
                  </div>

                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Insights */}
          <Card>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              Career Insights
            </h3>

            <div className="mt-6 space-y-4 text-sm sm:text-base text-gray-600">
              <p>🎯 Strong in analytical decision making</p>
              <p>📈 Excellent logical reasoning ability</p>
              <p>🧠 Strong potential for strategic roles</p>

              <div className="pt-3">
                <p className="font-semibold text-gray-900 mb-3">
                  Suggested Careers
                </p>

                <div className="flex flex-wrap gap-3">
                  {careers.map((item, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full bg-orange-50 text-orange-600 text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

        </section>

        {/* Performance Summary */}
        <section className="mt-8 sm:mt-10">
          <Card>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              Summary
            </h3>

            <p className="mt-4 text-gray-600 leading-7 text-sm sm:text-base">
              You performed exceptionally well in logic, reasoning and
              decision-making areas. Improving communication and speed can
              push you into the Top 1% bracket nationally.
            </p>
          </Card>
        </section>

        {/* Actions */}
        <section className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button fullWidth className="sm:w-auto">
            Download Report
          </Button>

          <Link to="/leaderboard">
            <Button
              variant="secondary"
              fullWidth
              className="sm:w-auto"
            >
              View Rankings
            </Button>
          </Link>

          <Link to="/dashboard">
            <Button
              variant="secondary"
              fullWidth
              className="sm:w-auto"
            >
              Dashboard
            </Button>
          </Link>
        </section>

      </div>
    </main>
  );
}