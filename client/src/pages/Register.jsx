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
  const [apiError, setApiError] = useState("");

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
  setApiError("");
};



  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
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
    }catch (err) {
  if (err?.response?.status === 500) {
    setApiError("Request failed, please try again");
  // } else {
  //   setApiError(err?.response?.data?.message || "Registration failed");
  // }
}else {
  setApiError(res?.message || "Registration failed");
}
}
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-6 py-16">
      <div className="grid lg:grid-cols-2 gap-10 max-w-6xl w-full items-center">

        {/* Left */}
        <div className="hidden lg:block space-y-6 pr-8">
          <span className="inline-flex px-4 py-2 rounded-full bg-white text-orange-600 font-semibold shadow-sm">
            Join free today
          </span>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Join <span className="text-orange-500">First Rank India</span>
          </h1>
          <p className="mt-6 text-gray-600 text-lg">
            Start your journey toward rankings, growth and career clarity.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              ["Free", "Account"],
              ["Fast", "Setup"],
              ["Easy", "Access"],
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
            Create Account
          </h2>
          <p className="text-gray-500 mb-6">
            It takes less than a minute
          </p>

          <div className="mb-4 rounded-xl bg-orange-50 text-orange-700 border border-orange-200 px-4 py-3 text-sm">
            Create your account to unlock testing, ranking and result tracking.
          </div>

          {apiError && (
  <p className="text-red-500 text-sm mb-2">
    {apiError}
  </p>
)}

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            />
               
               {errors.name && (
  <p className="text-red-500 text-sm mt-1">
    {errors.name}
  </p>
)}







            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            />

          {errors.email && (
  <p className="text-red-500 text-sm mt-1">
    {errors.email}
  </p>
)}





            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            />

      
{errors.password && (
  <p className="text-red-500 text-sm mt-1">
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

          <p className="mt-6 text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 font-medium">
              Login
            </Link>
          </p>
        </Card>
      </div>
    </main>
  );
}