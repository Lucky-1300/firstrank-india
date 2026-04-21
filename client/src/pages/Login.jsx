import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import { apiCall } from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
if (!formData.email) {
  setErrors({ email: "Email is required" });
  return;
}

if (!formData.password) {
  setErrors({ password: "Password is required" });
  return;
}

if (formData.password.length < 8) {
  setErrors({ password: "Password must be at least 8 characters" });
  return;
}

    setLoading(true);

    try {
      const res = await apiCall("/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });
       

      console.log("LOGIN RESPONSE",res)



      if (res.success) {
        localStorage.setItem("authToken", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/");
      } else {
        setErrors({ password: res.message || "Login failed" });
      }
    } catch (err) {
     setErrors({ password: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="grid lg:grid-cols-2 gap-10 max-w-6xl w-full items-center">

        {/* Left */}
        <div className="hidden lg:block">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Welcome Back to <span className="text-orange-500">First Rank India</span>
          </h1>
          <p className="mt-6 text-gray-600 text-lg">
            Continue your journey to discover your real potential beyond marks.
          </p>
        </div>

        {/* Right */}
        <Card className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Sign In
          </h2>
          <p className="text-gray-500 mb-6">
            Access your dashboard instantly
          </p>

          {/* {error && (
            <div className="mb-4 rounded-xl bg-red-50 text-red-600 px-4 py-3 text-sm">
              {error}
            </div>
          )} */}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="you@example.com"
              />
            </div>
             {errors.email && (
  <p className="text-red-500 text-sm mt-1">
    {errors.email}
  </p>
)}
  

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="••••••••"
              />

  {errors.password && (
  <p className="text-red-500 text-sm mt-1">
    {errors.password}
  </p>
)}


            </div>

            <Button fullWidth size="lg" disabled={loading}>
              {loading ? "Signing In..." : "Login"}
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