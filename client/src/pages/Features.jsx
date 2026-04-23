import { Link } from "react-router-dom";
import { Brain, Trophy, Sparkles, Target, BarChart3, Shield } from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Features() {
  const featureCards = [
    {
      icon: Brain,
      title: "Skill Intelligence",
      desc: "Measure logic, reasoning, communication and leadership with structured assessments.",
    },
    {
      icon: Trophy,
      title: "National Ranking",
      desc: "Track your city, state and national rank with transparent score-based visibility.",
    },
    {
      icon: Sparkles,
      title: "AI Insights",
      desc: "Get actionable recommendations to improve your weak areas after every test.",
    },
    {
      icon: Target,
      title: "Career Mapping",
      desc: "Discover potential career paths aligned to your strengths and interest profile.",
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      desc: "Visual dashboards help you monitor growth and consistency over time.",
    },
    {
      icon: Shield,
      title: "Trusted Platform",
      desc: "Built with secure auth, reliable performance and student-first UX.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10 sm:py-14 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">Platform Features</p>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white">
            Everything built for
            <span className="text-orange-500"> student growth</span>
          </h1>
          <p className="mt-5 max-w-3xl mx-auto text-base sm:text-lg text-gray-600 dark:text-slate-300 leading-8">
            First Rank India combines smart assessments, ranking transparency and growth insights so learners can improve with confidence.
          </p>
        </section>

        <section className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} hover className="h-full">
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-500/10 text-orange-600 flex items-center justify-center">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-slate-300">{item.desc}</p>
              </Card>
            );
          })}
        </section>

        <section className="mt-12">
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-xl text-center py-10">
            <h2 className="text-3xl sm:text-4xl font-black">Ready to use these features?</h2>
            <p className="mt-3 text-white/90 max-w-2xl mx-auto">
              Create your account and start your first free test today.
            </p>
            <div className="mt-7 flex justify-center gap-3 flex-wrap">
              <Link to="/register">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                  Start Free Test
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="secondary" className="border-white text-white hover:bg-white/10">
                  Learn About Us
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
