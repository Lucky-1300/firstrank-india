import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import { apiCall } from "../services/api";
import { Zap, Lock, Sparkles } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user: authUser, ready } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  const getSafeStoredUser = () => {
    try {
      const rawUser = localStorage.getItem("user");
      return rawUser ? JSON.parse(rawUser) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  };

  const [user, setUser] = useState(
    authUser || getSafeStoredUser() || {
      name: "Guest",
      email: "",
      category: "student",
    }
  );

  // Move useMemo before useEffect and early returns
  const stats = useMemo(() => [
    { label: "Your Rank", value: `#${user?.rank || 42}` },
    { label: "Tests Completed", value: user?.totalTests || 12 },
    { label: "Average Score", value: `${user?.averageScore || 88}%` },
    { label: "Skills Gained", value: user?.skills?.length || 6 },
  ], [user]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const storedUser = authUser || getSafeStoredUser();

        // ✅ DEV MODE (no backend / no login)
        if (!token) {
          setUser(storedUser || {
            name: "Guest",
            email: "",
            category: "student",
            rank: 0,
            totalTests: 0,
            averageScore: 0,
            skills: [],
          });
          setIsLoading(false);
          return;
        }

        // ✅ If user already stored (fast load)
        if (storedUser) {
          setUser(storedUser);
          setIsLoading(false);
          return;
        }

        // 🔐 Try fetching latest data from backend
        const res = await apiCall("/auth/profile", { method: "GET" });

        if (res?.success && (res.user || res.data)) {
          const userData = res.user || res.data;
          setUser(userData);
          // ✅ keep local copy updated
          localStorage.setItem("user", JSON.stringify(userData));
        } else if (storedUser) {
          // If profile fetch fails but we have stored user, use it
          setUser(storedUser);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Dashboard error:", error);

        // fallback to stored user
        const storedUser = getSafeStoredUser();
        if (storedUser) {
          setUser(storedUser);
        } else {
          localStorage.removeItem("authToken");
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, authUser]);

  if (!ready || isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-slate-950">
        <LoadingSpinner fullScreen label="Loading dashboard..." />
      </main>
    );
  }


  const progress = [
    ["Problem Solving", 82],
    ["Communication", 75],
    ["Critical Thinking", 91],
    ["Leadership", 68],
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-950 py-8 sm:py-10 lg:py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <p className="text-sm font-semibold text-orange-500 uppercase tracking-widest">
              Dashboard
            </p>

            <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight transition-colors duration-300">
              Welcome back, {user?.name} 👋
            </h1>

            <p className="mt-3 text-sm sm:text-base text-gray-500 dark:text-slate-400 transition-colors duration-300">
              Keep growing and track your progress in real time.
            </p>
          </div>
        </div>

        {/* Stats */}
        <section className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item, i) => (
            <Card key={i} className="p-5 sm:p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 transition-colors duration-300">
                {item.label}
              </p>

              <h3 className="mt-2 text-2xl sm:text-3xl font-black text-orange-500 transition-colors duration-300">
                {item.value}
              </h3>
            </Card>
          ))}
        </section>

        {/* Start Exam Section */}
        <section className="mt-8 sm:mt-10">
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                  <Zap size={28} />
                  Ready for a Challenge?
                </h3>
                <p className="mt-2 text-orange-100 text-sm sm:text-base">
                  Take the next skill assessment and measure your growth
                </p>
              </div>
              <Link to="/exam">
                <Button 
                  size="lg" 
                  className="bg-white text-orange-600 hover:bg-gray-100 whitespace-nowrap"
                >
                  Start Test
                </Button>
              </Link>
            </div>
          </Card>
        </section>

        {/* Main Content */}
        <section className="mt-8 sm:mt-10 grid lg:grid-cols-3 gap-6">

          {/* Progress */}
          <Card className="lg:col-span-2 hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                Skill Progress
              </h3>

              <span className="text-sm text-gray-500 dark:text-slate-400 transition-colors duration-300">
                Updated today
              </span>
            </div>

            <div className="space-y-6 mt-6">
              {progress.map(([name, value], i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700 dark:text-slate-300 transition-colors duration-300">
                      {name}
                    </span>
                    <span className="text-gray-500 dark:text-slate-400 transition-colors duration-300">
                      {value}%
                    </span>
                  </div>

                  <div className="h-3 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden transition-colors duration-300">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-700"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Profile */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              Profile
            </h3>

            <div className="mt-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xl font-black">
                {/* {user.name?.charAt(0)?.toUpperCase()} */}
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>

              <div>
                <p className="font-bold text-gray-900 dark:text-white transition-colors duration-300">
                  {user?.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-slate-400 transition-colors duration-300">
                  {user?.category}
                </p>
              </div>
            </div>

            <div className="space-y-5 mt-8 text-sm">
              <div>
                <p className="text-gray-500 dark:text-slate-400 transition-colors duration-300">Email</p>
                <p className="font-medium break-all text-gray-900 dark:text-slate-100 transition-colors duration-300">
                  {user?.email}
                </p>
              </div>

              <div>
                <p className="text-gray-500 dark:text-slate-400 transition-colors duration-300">Category</p>
                <p className="font-medium capitalize text-gray-900 dark:text-slate-100 transition-colors duration-300">
                  {user?.category}
                </p>
              </div>

              <div>
                <p className="text-gray-500 dark:text-slate-400 transition-colors duration-300">Member Since</p>
                <p className="font-medium text-gray-900 dark:text-slate-100 transition-colors duration-300">
                  2026
                </p>
              </div>
            </div>
          </Card>

        </section>

        {/* Extra Section */}
        <section className="mt-8 sm:mt-10 grid md:grid-cols-2 gap-6">

          <Card hover className="relative overflow-hidden">
            <div className="absolute inset-0 bg-white/75 dark:bg-slate-950/75 backdrop-blur-md flex items-center justify-center">
              <div className="text-center px-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg">
                  <Lock size={20} />
                </div>
                <p className="mt-3 font-bold text-gray-900 dark:text-white">Premium Locked</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">Upgrade to unlock advanced insights and coaching.</p>
                <Button className="mt-4 inline-flex items-center gap-2">
                  <Sparkles size={16} />
                  Unlock Premium
                </Button>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              Next Goal
            </h3>

            <p className="mt-4 text-gray-600 dark:text-slate-300 leading-7 text-sm sm:text-base transition-colors duration-300">
              Improve Communication score to reach Top 20 national rank.
            </p>

            <div className="mt-6">
              <Button size="sm">
                Start Practice
              </Button>
            </div>
          </Card>

          <Card hover>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              Recent Activity
            </h3>

            <ul className="mt-5 space-y-4 text-sm text-gray-600 dark:text-slate-300 transition-colors duration-300">
              <li>✅ Completed Aptitude Test</li>
              <li>📈 Rank improved from #58 to #42</li>
              <li>🎯 New skill unlocked: Leadership</li>
            </ul>
          </Card>

        </section>

      </div>
    </main>
  );
}