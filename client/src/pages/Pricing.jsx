import { Link } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "/month",
      features: ["Basic assessments", "Score summary", "Limited reports"],
      cta: "Get Started",
      link: "/register",
      highlight: false,
    },
    {
      name: "Premium",
      price: "₹299",
      period: "/month",
      features: ["Unlimited tests", "Advanced reports", "Rank alerts", "Priority support"],
      cta: "Upgrade Now",
      link: "/register",
      highlight: true,
    },
  ];

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10 sm:py-14 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center animate-fadeIn">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">Pricing</p>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white">
            Simple plans for every learner
          </h1>
          <p className="mt-5 max-w-3xl mx-auto text-base sm:text-lg text-gray-600 dark:text-slate-300 leading-8">
            Start free and upgrade anytime for deeper insights and premium growth tools.
          </p>
        </section>

        <section className="mt-12 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={
                plan.highlight
                  ? "relative overflow-hidden border-2 border-orange-300 shadow-xl bg-linear-to-br from-white via-orange-50 to-orange-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
                  : "bg-white/90 dark:bg-slate-900/90"
              }
              hover
            >
              {plan.highlight && (
                <div className="mb-5 inline-flex items-center rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-white shadow-sm">
                  Most Popular
                </div>
              )}
              <p className="text-sm uppercase tracking-widest text-orange-500 font-semibold">{plan.name}</p>
              <div className="mt-3 flex items-end gap-1">
                <h3 className="text-4xl font-black text-gray-900 dark:text-white">{plan.price}</h3>
                <span className="text-gray-500 dark:text-slate-400 mb-1">{plan.period}</span>
              </div>

              <ul className="mt-6 space-y-3 text-sm text-gray-600 dark:text-slate-300">
                {plan.features.map((feature) => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>

              <div className="mt-8">
                <Link to={plan.link}>
                  <Button fullWidth variant={plan.highlight ? "primary" : "secondary"} size="lg">
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
}
