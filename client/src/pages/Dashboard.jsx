import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import { apiCall } from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiCall("/auth/profile", { method: "GET" });

        if (res.success) {
          setUser(res.user);
        } else {
          navigate("/login");
        }
      } catch {
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  const stats = [
    { label: "Your Rank", value: `#${user.rank || 42}` },
    { label: "Tests Completed", value: user.totalTests || 12 },
    { label: "Average Score", value: `${user.averageScore || 88}%` },
    { label: "Skills Gained", value: user.skills?.length || 6 },
  ];

  const progress = [
    ["Problem Solving", 82],
    ["Communication", 75],
    ["Critical Thinking", 91],
    ["Leadership", 68],
  ];

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <p className="text-sm font-semibold text-orange-500 uppercase tracking-widest">
              Dashboard
            </p>

            <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              Welcome back, {user.name} 👋
            </h1>

            <p className="mt-3 text-sm sm:text-base text-gray-500">
              Keep growing and track your progress in real time.
            </p>
          </div>

          <div className="w-full sm:w-auto">
            <Button
              onClick={logout}
              fullWidth
              className="sm:w-auto"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <section className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item, i) => (
            <Card key={i} className="p-5 sm:p-6">
              <p className="text-xs sm:text-sm text-gray-500">
                {item.label}
              </p>

              <h3 className="mt-2 text-2xl sm:text-3xl font-black text-orange-500">
                {item.value}
              </h3>
            </Card>
          ))}
        </section>

        {/* Main Content */}
        <section className="mt-8 sm:mt-10 grid lg:grid-cols-3 gap-6">

          {/* Progress */}
          <Card className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Skill Progress
              </h3>

              <span className="text-sm text-gray-500">
                Updated today
              </span>
            </div>

            <div className="space-y-6 mt-6">
              {progress.map(([name, value], i) => (
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
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-700"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Profile */}
          <Card>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              Profile
            </h3>

            <div className="mt-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xl font-black">
                {user.name?.charAt(0)?.toUpperCase()}
              </div>

              <div>
                <p className="font-bold text-gray-900">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500">
                  {user.category}
                </p>
              </div>
            </div>

            <div className="space-y-5 mt-8 text-sm">
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium break-all">
                  {user.email}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Category</p>
                <p className="font-medium capitalize">
                  {user.category}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Member Since</p>
                <p className="font-medium">
                  2026
                </p>
              </div>
            </div>
          </Card>

        </section>

        {/* Extra Section */}
        <section className="mt-8 sm:mt-10 grid md:grid-cols-2 gap-6">

          <Card>
            <h3 className="text-xl font-bold text-gray-900">
              Next Goal
            </h3>

            <p className="mt-4 text-gray-600 leading-7 text-sm sm:text-base">
              Improve Communication score to reach Top 20 national rank.
            </p>

            <div className="mt-6">
              <Button size="sm">
                Start Practice
              </Button>
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-bold text-gray-900">
              Recent Activity
            </h3>

            <ul className="mt-5 space-y-4 text-sm text-gray-600">
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