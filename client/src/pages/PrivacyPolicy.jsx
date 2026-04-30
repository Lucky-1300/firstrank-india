import { Link } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";

const sections = [
  {
    title: "Information we collect",
    points: [
      "Account details such as name, email and password",
      "Test activity, scores and reports generated during platform use",
      "Device and session data used to keep the app secure and reliable",
    ],
  },
  {
    title: "How we use data",
    points: [
      "Authenticate your account and personalize the dashboard",
      "Generate exam reports, rankings and progress summaries",
      "Improve platform performance, safety and support",
    ],
  },
  {
    title: "Your controls",
    points: [
      "Update profile information from your account pages",
      "Request account support through the contact page",
      "Sign out at any time to clear the local session on the device",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10 sm:py-14 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">Legal</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-black text-gray-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-5 max-w-3xl mx-auto text-base sm:text-lg text-gray-600 dark:text-slate-300 leading-8">
            This page explains how First Rank India handles account and assessment data.
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
            <h2 className="text-3xl sm:text-4xl font-black">Need support with your data?</h2>
            <p className="mt-3 text-white/90 max-w-2xl mx-auto">
              Reach out if you want help understanding, updating or removing your account information.
            </p>
            <div className="mt-7 flex justify-center gap-3 flex-wrap">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                  Contact Us
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="secondary" className="border-white text-white hover:bg-white/10">
                  Create Account
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
