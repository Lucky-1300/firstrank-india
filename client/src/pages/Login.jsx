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
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-6 py-16">
      <div className="grid lg:grid-cols-2 gap-10 max-w-6xl w-full items-center">

        {/* Left */}
        <div className="hidden lg:block space-y-6 pr-8">
          <span className="inline-flex px-4 py-2 rounded-full bg-white text-orange-600 font-semibold shadow-sm">
            Welcome back
          </span>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Welcome Back to <span className="text-orange-500">First Rank India</span>
          </h1>
          <p className="mt-6 text-gray-600 text-lg">
            Continue your journey to discover your real potential beyond marks.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              ["Quick", "Login"],
              ["Secure", "Access"],
              ["Instant", "Dashboard"],
            ].map(([top, bottom]) => (
              <div key={bottom} className="bg-white rounded-2xl p-4 shadow-sm border border-white/80 text-center">
                <p className="text-orange-500 font-bold">{top}</p>
                <p className="text-sm text-gray-600">{bottom}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <Card className="max-w-md w-full mx-auto shadow-xl border border-orange-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Sign In
          </h2>
          <p className="text-gray-500 mb-6">
            Access your dashboard instantly
          </p>

          {sessionMessage && (
            <div className="mb-4 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 px-4 py-3 text-sm">
              {sessionMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                placeholder="you@example.com"
              />
            </div>
             {errors.email && (
  <p className="text-red-500 text-sm mt-1">
    {errors.email}
  </p>
)}
  

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                placeholder="••••••••"
              />

  {errors.password && (
  <p className="text-red-500 text-sm mt-1">
    {errors.password}
  </p>
)}


            </div>

            <Button fullWidth size="lg" loading={loading}>
              Login
            </Button>
          </form>

          <p className="mt-6 text-sm text-gray-500 text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-orange-500 font-medium">
              Create one
            </Link>
          </p>
        </Card>
      </div>
    </main>
  );
}