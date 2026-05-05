import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    category: "student",
  });

  const [errors, setErrors] = useState({});

  // const handleChange = (e) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  //   setError("");
  // };

  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  setErrors((prev) => ({
    ...prev,
    [name]: ""
  }));
};



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nextErrors = {};

      if (!formData.name.trim()) nextErrors.name = "Name is required";
      if (!formData.email.trim()) nextErrors.email = "Email is required";
      if (!formData.password) nextErrors.password = "Password is required";
      if (formData.password && formData.password.length < 8) {
        nextErrors.password = "Password must be at least 8 characters";
      }

      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        return;
      }

      const res = await register(formData);

      if (res?.success) {
        navigate("/dashboard");
      } else {
        setErrors({ email: res?.message || "Registration failed" });
      }
    } catch (err) {
      setErrors({ email: err?.message || "Something went wrong" });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-6 py-16 transition-colors duration-300">
      <div className="grid lg:grid-cols-2 gap-10 max-w-6xl w-full items-center">

        {/* Left */}
        <div className="hidden lg:block space-y-6 pr-8">
          <span className="inline-flex px-4 py-2 rounded-full bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 font-semibold shadow-sm transition-colors duration-300">
            Join free today
          </span>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight transition-colors duration-300">
            Join <span className="text-orange-500 dark:text-orange-400">First Rank India</span>
          </h1>
          <p className="mt-6 text-gray-600 dark:text-slate-300 text-lg transition-colors duration-300">
            Start your journey toward rankings, growth and career clarity.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              ["Free", "Account"],
              ["Fast", "Setup"],
              ["Easy", "Access"],
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
            Create Account
          </h2>
          <p className="text-gray-500 dark:text-slate-400 mb-6 transition-colors duration-300">
            It takes less than a minute
          </p>

          <div className="mb-4 rounded-xl bg-orange-50 dark:bg-orange-500/15 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-500/30 px-4 py-3 text-sm transition-colors duration-300">
            Create your account to unlock testing, ranking and result tracking.
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-500 focus:border-orange-400 dark:focus:border-orange-500 transition placeholder:text-gray-400 dark:placeholder:text-slate-500"
            />
               
               {errors.name && (
  <p className="text-red-500 dark:text-red-400 text-sm mt-1 transition-colors duration-300">
    {errors.name}
  </p>
)}







            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-500 focus:border-orange-400 dark:focus:border-orange-500 transition placeholder:text-gray-400 dark:placeholder:text-slate-500"
            />

          {errors.email && (
  <p className="text-red-500 dark:text-red-400 text-sm mt-1 transition-colors duration-300">
    {errors.email}
  </p>
)}





            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-500 focus:border-orange-400 dark:focus:border-orange-500 transition placeholder:text-gray-400 dark:placeholder:text-slate-500"
            />

      
{errors.password && (
  <p className="text-red-500 dark:text-red-400 text-sm mt-1 transition-colors duration-300">
    {errors.password}
  </p>
)}
            {/* <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            >
              <option value="student">Student</option>
              <option value="business">Business Minded</option>
              <option value="job">Job Minded</option>
              <option value="institution">Institution</option>
            </select> */}

            <Button fullWidth size="lg" loading={loading}>
              Create Free Account
            </Button>
          </form>

          <p className="mt-6 text-sm text-gray-500 dark:text-slate-400 text-center transition-colors duration-300">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 dark:text-orange-400 font-medium hover:text-orange-600 dark:hover:text-orange-300 transition-colors duration-300">
              Login
            </Link>
          </p>
        </Card>
      </div>
    </main>
  );
}