import { useState } from "react";

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    // error automatic remove
    setErrors({
      ...errors,
      [name]: ""
    });

  };

  const validate = () => {

    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } 
    else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    return newErrors;

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Login Data:", formData);

  };

  return (

    <div>

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: "12px" }}>

          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.email}
            </p>
          )}

        </div>

        <div style={{ marginBottom: "12px" }}>

          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={formData.password}
            onChange={handleChange}
          />

          {errors.password && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.password}
            </p>
          )}

        </div>

        <button type="submit">Login</button>

      </form>

    </div>

  );

}

export default Login;