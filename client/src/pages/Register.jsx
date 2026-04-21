import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import { apiCall } from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    category: "student",
  });

  const [loading, setLoading] = useState(false);
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

if (!formData.name) {
  setErrors({ name: "Name is required" });
  return;
}

if (!formData.email) {
  setErrors({ email: "Email is required" });
  return;
}
if (formData.password.length < 8) {
  setErrors({ password: "Password must be at least 8 characters" });
  return;
}


    setLoading(true);

    try {
      const res = await apiCall("/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      // if (res.success) {
      //   localStorage.setItem("authToken", res.token);
      //   localStorage.setItem("user", JSON.stringify(res.user));
      //   navigate("/dashboard");
      // } 
//       if (res.success) {
//   alert("You are signed up successfully 🎉");

//   localStorage.setItem("authToken", res.token);
//   localStorage.setItem("user", JSON.stringify(res.user));

//   navigate("/");
// }
if (res.success) {
  alert("You are signed up successfully 🎉");

  navigate("/");
}
      else {
        // setError(res.message || "Registration failed");
        setErrors({ email: res.message || "Registration failed" });
      }
    } catch (err) {
      // setError("Something went wrong");
      setErrors({ email: "Something went wrong" });
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
            Join <span className="text-orange-500">First Rank India</span>
          </h1>
          <p className="mt-6 text-gray-600 text-lg">
            Start your journey toward rankings, growth and career clarity.
          </p>
        </div>

        {/* Right */}
        <Card className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h2>
          <p className="text-gray-500 mb-6">
            It takes less than a minute
          </p>

          {/* {error && (
            <div className="mb-4 rounded-xl bg-red-50 text-red-600 px-4 py-3 text-sm">
              {error}
            </div>
          )} */}

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="name"
            
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
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
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
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
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />

      
{errors.password && (
  <p className="text-red-500 text-sm mt-1">
    {errors.password}
  </p>
)}
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="student">Student</option>
              <option value="business">Business Minded</option>
              <option value="job">Job Minded</option>
              <option value="institution">Institution</option>
            </select>

            <Button fullWidth size="lg" disabled={loading}>
              {loading ? "Creating..." : "Create Free Account"}
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