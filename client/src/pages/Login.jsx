import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const sessionMessage = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("session") === "expired"
      ? "Your session expired. Please log in again."
      : "";
  }, [location.search]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nextErrors = {};

      if (!formData.email.trim()) nextErrors.email = "Email is required";
      if (!formData.password) nextErrors.password = "Password is required";

      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        return;
      }

      const res = await login(formData.email.trim(), formData.password);

      if (res?.success) {
        const redirectPath = localStorage.getItem("redirectAfterLogin");
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath || "/dashboard");
      } else {
        setErrors({ password: res?.message || "Login failed" });
      }
    } catch (err) {
      setErrors({ password: err?.message || "Something went wrong" });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-6 py-16 transition-colors duration-300">
      <div className="grid lg:grid-cols-2 gap-10 max-w-6xl w-full items-center">

        {/* Left */}
        <div className="hidden lg:block space-y-6 pr-8">
          <span className="inline-flex px-4 py-2 rounded-full bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 font-semibold shadow-sm transition-colors duration-300">
            Welcome back
          </span>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight transition-colors duration-300">
            Welcome Back to <span className="text-orange-500 dark:text-orange-400">First Rank India</span>
          </h1>
          <p className="mt-6 text-gray-600 dark:text-slate-300 text-lg transition-colors duration-300">
            Continue your journey to discover your real potential beyond marks.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              ["Quick", "Login"],
              ["Secure", "Access"],
              ["Instant", "Dashboard"],
            ].map(([top, bottom]) => (
              <div key={bottom} className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-white/80 dark:border-slate-700 text-center transition-colors duration-300">
                <p className="text-orange-500 dark:text-orange-400 font-bold transition-colors duration-300">{top}</p>
                <p className="text-sm text-gray-600 dark:text-slate-400 transition-colors duration-300">{bottom}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <Card className="max-w-md w-full mx-auto shadow-xl border border-orange-100 dark:border-slate-800">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
            Sign In
          </h2>
          <p className="text-gray-500 dark:text-slate-400 mb-6 transition-colors duration-300">
            Access your dashboard instantly
          </p>

          {sessionMessage && (
            <div className="mb-4 rounded-xl bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 px-4 py-3 text-sm transition-colors duration-300">
              {sessionMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300 transition-colors duration-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-500 focus:border-orange-400 dark:focus:border-orange-500 transition placeholder:text-gray-400 dark:placeholder:text-slate-500"
                placeholder="you@example.com"
              />
            </div>
             {errors.email && (
  <p className="text-red-500 dark:text-red-400 text-sm mt-1 transition-colors duration-300">
    {errors.email}
  </p>
)}
  

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300 transition-colors duration-300">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-500 focus:border-orange-400 dark:focus:border-orange-500 transition placeholder:text-gray-400 dark:placeholder:text-slate-500"
                placeholder="••••••••"
              />

  {errors.password && (
  <p className="text-red-500 dark:text-red-400 text-sm mt-1 transition-colors duration-300">
    {errors.password}
  </p>
)}


            </div>

            <Button fullWidth size="lg" loading={loading}>
              Login
            </Button>
          </form>

          <p className="mt-6 text-sm text-gray-500 dark:text-slate-400 text-center transition-colors duration-300">
            Don't have an account?{" "}
            <Link to="/register" className="text-orange-500 dark:text-orange-400 font-medium hover:text-orange-600 dark:hover:text-orange-300 transition-colors duration-300">
              Create one
            </Link>
          </p>
        </Card>
      </div>
    </main>
  );
}