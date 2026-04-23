import { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import { Bell, Shield, Mail, Moon, Lock } from "lucide-react";

export default function Settings() {
  const [emailUpdates, setEmailUpdates] = useState(() => {
    const saved = localStorage.getItem("settings.emailUpdates");
    return saved === null ? true : saved === "true";
  });
  const [rankAlerts, setRankAlerts] = useState(() => {
    const saved = localStorage.getItem("settings.rankAlerts");
    return saved === null ? true : saved === "true";
  });
  const [darkPreference, setDarkPreference] = useState(() => {
    const saved = localStorage.getItem("settings.darkPreference");
    return saved === null ? false : saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("settings.emailUpdates", String(emailUpdates));
  }, [emailUpdates]);

  useEffect(() => {
    localStorage.setItem("settings.rankAlerts", String(rankAlerts));
  }, [rankAlerts]);

  useEffect(() => {
    localStorage.setItem("settings.darkPreference", String(darkPreference));
  }, [darkPreference]);

  const SettingRow = ({ icon: Icon, title, desc, enabled, onToggle }) => (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-gray-50 dark:bg-slate-900/70 border border-gray-100 dark:border-slate-800 p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0">
          <Icon size={18} />
        </div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">{title}</p>
          <p className="text-sm text-gray-500 dark:text-slate-400">{desc}</p>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`w-14 h-8 rounded-full p-1 transition ${enabled ? "bg-orange-500" : "bg-gray-300 dark:bg-slate-700"}`}
        aria-label={`Toggle ${title}`}
      >
        <span
          className={`block h-6 w-6 rounded-full bg-white transition-transform ${enabled ? "translate-x-6" : "translate-x-0"}`}
        />
      </button>
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8 sm:py-10 lg:py-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-xl mb-6">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_white,_transparent_45%)]" />
          <div className="relative">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-white/80">
              Account
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-black">Settings</h1>
            <p className="mt-3 text-white/90 max-w-2xl">
              Manage your notifications, privacy and preferences from one premium control center.
            </p>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 space-y-4 hover:shadow-xl transition-all duration-300">
            <SettingRow
              icon={Mail}
              title="Email Updates"
              desc="Get product and exam updates on your email."
              enabled={emailUpdates}
              onToggle={() => setEmailUpdates((v) => !v)}
            />
            <SettingRow
              icon={Bell}
              title="Rank Alerts"
              desc="Notify me whenever my city, state or national rank changes."
              enabled={rankAlerts}
              onToggle={() => setRankAlerts((v) => !v)}
            />
            <SettingRow
              icon={Moon}
              title="Dark Preference"
              desc="Store your dark mode preference for account personalization."
              enabled={darkPreference}
              onToggle={() => setDarkPreference((v) => !v)}
            />

            <div className="pt-2">
              <Button size="sm">Save Preferences</Button>
            </div>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-orange-100 dark:bg-orange-500/10 text-orange-600 flex items-center justify-center">
              <Shield size={20} />
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">Privacy & Security</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-slate-400 leading-7">
              Your account settings are private. Preferences are saved locally and can be synced to backend later.
            </p>

            <div className="mt-6 rounded-2xl bg-gray-50 dark:bg-slate-900/70 border border-gray-100 dark:border-slate-800 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-slate-300">
                <Lock size={14} className="text-orange-500" />
                Security Status
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">Protected</p>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
