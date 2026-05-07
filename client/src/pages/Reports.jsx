import Card from "../components/Card";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import {
  Brain,
  Users,
  Target,
  BarChart3,
  TrendingUp,
  Lightbulb,
} from "lucide-react";

export default function Reports() {
  const reportCards = [
    {
      icon: Brain,
      title: "Personality Insight",
      text: "You remain calm under pressure and solve structured challenges effectively.",
    },
    {
      icon: Users,
      title: "Team Strength",
      text: "You communicate clearly and help teams move toward better decisions.",
    },
    {
      icon: Target,
      title: "Growth Focus",
      text: "Financial reasoning and long-form problem solving are your next skill priorities.",
    },
    {
      icon: BarChart3,
      title: "Performance Trend",
      text: "Your recent attempts show a consistent upward trend in analytical performance.",
    },
  ];

const stored = JSON.parse(localStorage.getItem("latestExamResult")) || {};
const sections = stored.payload?.report?.sections || {};
const labelMap = {
  Decision: "Decision Making",
  Leadership: "Leadership",
  Finance: "Logic",
};


const order = ["Decision", "Leadership", "Finance", "Communication"];

const strengths = order.map((key) => {
  const value = sections[key];

  let percent = 0;

  if (value) {
    percent = value.percentage || 0;
  }

  return [
    labelMap[key] || key, // Communication automatically same rahega
    Math.min(100, Math.round(percent)),
  ];
});

  const recommendations = [
    "Practice 2 finance-based case studies every week",
    "Attempt one timed mock test every 3 days",
    "Review your weak-question patterns after each test",
    "Focus on speed plus accuracy in section 2",
  ];


if (!strengths.length) {
  return <div className="text-center mt-10">No data available</div>;
}





  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8 sm:py-10 lg:py-14 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center mb-10">
          <p className="text-orange-500 text-xs sm:text-sm font-bold uppercase tracking-[0.25em]">
            Reports
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white transition-colors duration-300">
            Detailed Skill Report
          </h1>
          <p className="mt-4 text-sm sm:text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto transition-colors duration-300">
            A focused breakdown of your strengths, growth areas, and recommendations.
          </p>
        </section>

        <section className="grid lg:grid-cols-2 gap-6 mb-8 sm:mb-10">
          <Card className="shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="text-orange-500" size={24} />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                Strength Overview
              </h3>
            </div>

            <div className="space-y-5">
              {strengths.map(([name, value]) => (
                <div key={name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700 dark:text-slate-300 text-sm sm:text-base transition-colors duration-300">
                      {name
  .replace(/([A-Z])/g, " $1")
  .replace(/^./, (str) => str.toUpperCase())}
                    </span>
                    <span className="text-orange-600 font-bold text-sm">{value}%</span>
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

          <Card className="shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="text-orange-500" size={24} />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                Action Recommendations
              </h3>
            </div>

            <div className="space-y-3">
              {recommendations.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 text-gray-700 dark:text-slate-200 text-sm sm:text-base transition-colors duration-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="mb-8 sm:mb-10">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {reportCards.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} hover className="h-full">
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

        <section className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/result" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full">
              Back to Results
            </Button>
          </Link>
          <Link to="/leaderboard" className="w-full sm:w-auto">
            <Button size="lg" className="w-full">
              View Leaderboard
            </Button>
          </Link>
        </section>
      </div>
    </main>
  );
}