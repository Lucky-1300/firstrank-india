import { Link } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Cookies() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10 sm:py-14 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">Privacy</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-black text-gray-900 dark:text-white">
            Cookie Policy
          </h1>
          <p className="mt-5 text-gray-600 dark:text-slate-300 max-w-2xl mx-auto leading-8">
            This Cookie Policy explains how First Rank India uses cookies and
            similar tracking technologies on our website to provide and improve
            our services.
          </p>
        </section>

        <section className="grid gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">What are cookies?</h2>
            <p className="mt-3 text-gray-600 dark:text-slate-300 leading-7">
              Cookies are small text files placed on your device when you visit
              websites. They are widely used to make sites work or work more
              efficiently, and to provide information to the site owners.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">How we use cookies</h2>
            <ul className="mt-3 list-disc pl-5 text-gray-600 dark:text-slate-300 leading-7">
              <li>Essential: Required to operate the site and authenticate users.</li>
              <li>Performance: Help us understand usage and improve the site.</li>
              <li>Functionality: Enable enhanced features and preferences.</li>
              <li>Advertising: Used only if you opt into personalized marketing.</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your choices</h2>
            <p className="mt-3 text-gray-600 dark:text-slate-300 leading-7">
              You can control cookies through your browser settings. You may
              opt out of certain cookies, but disabling some cookies may affect
              the functionality of the site.
            </p>
            <div className="mt-4 flex gap-3">
              <Button variant="secondary" size="sm" as={Link} to="/privacy">
                View Privacy Policy
              </Button>
              <Button size="sm" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Back to Top
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Contact</h2>
            <p className="mt-3 text-gray-600 dark:text-slate-300 leading-7">
              If you have questions about our cookie practices, contact us at
              <a className="text-orange-500 dark:text-orange-400 ml-1" href="mailto:support@firstrankindia.com">support@firstrankindia.com</a>.
            </p>
          </Card>
        </section>
      </div>
    </main>
  );
}
