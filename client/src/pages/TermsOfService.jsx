import { Link } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";

const sections = [
  {
    title: "Account use",
    points: [
      "Keep your login credentials private and accurate",
      "Use the platform for lawful educational purposes only",
      "Do not interfere with assessments, rankings or other users",
    ],
  },
  {
    title: "Assessment rules",
    points: [
      "Complete tests honestly and independently",
      "Respect timing, navigation and submission limits",
      "Understand that scores and reports are for guidance, not formal certification",
    ],
  },
  {
    title: "Service limitations",
    points: [
      "Features may change as the product evolves",
      "We may suspend access for abuse, fraud or security reasons",
      "Availability depends on network and backend uptime",
    ],
  },
];

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10 sm:py-14 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">Legal</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-black text-gray-900 dark:text-white">
            Terms of Service
          </h1>
          <p className="mt-5 max-w-3xl mx-auto text-base sm:text-lg text-gray-600 dark:text-slate-300 leading-8">
            These terms define how you can use First Rank India and what you can expect from the platform.
          </p>
        </section>

        <section className="mt-12 grid gap-6">
          {sections.map((section) => (
            <Card key={section.title} hover className="h-full">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
              <ul className="mt-4 space-y-3 text-gray-600 dark:text-slate-300 leading-7 list-disc pl-5">
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </Card>
          ))}
        </section>

        <section className="mt-12">
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-xl text-center py-10">
            <h2 className="text-3xl sm:text-4xl font-black">Ready to continue?</h2>
            <p className="mt-3 text-white/90 max-w-2xl mx-auto">
              If you agree to these terms, you can keep using the platform and your personal dashboard.
            </p>
            <div className="mt-7 flex justify-center gap-3 flex-wrap">
              <Link to="/login">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                  Login
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="border-white text-white hover:bg-white/10">
                  Contact Support
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
