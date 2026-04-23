import { Link } from "react-router-dom";
import { ClipboardList, Brain, Trophy } from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";

export default function HowItWorks() {
  const steps = [
    {
      icon: ClipboardList,
      title: "Take Assessment",
      desc: "Attempt structured questions across skill categories in a guided exam flow.",
    },
    {
      icon: Brain,
      title: "Get Skill Analysis",
      desc: "Receive score breakdowns and AI-led insights for strengths and gaps.",
    },
    {
      icon: Trophy,
      title: "Track Rank & Grow",
      desc: "See your city, state and national rank and improve with targeted practice.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10 sm:py-14 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">How It Works</p>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white">
            Three simple steps to
            <span className="text-orange-500"> real growth</span>
          </h1>
          <p className="mt-5 max-w-3xl mx-auto text-base sm:text-lg text-gray-600 dark:text-slate-300 leading-8">
            First Rank India makes skill assessment easy, measurable and actionable for every student.
          </p>
        </section>

        <section className="mt-12 grid md:grid-cols-3 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} hover className="text-center h-full">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-100 dark:bg-orange-500/10 text-orange-600 flex items-center justify-center">
                  <Icon size={24} />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-slate-300">{item.desc}</p>
              </Card>
            );
          })}
        </section>

        <section className="mt-12 text-center">
          <Link to="/register">
            <Button size="lg">Start Free Test</Button>
          </Link>
        </section>
      </div>
    </main>
  );
}
