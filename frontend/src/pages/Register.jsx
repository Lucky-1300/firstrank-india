import { useState } from "react";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    // remove error automatically
    setErrors({
      ...errors,
      [name]: ""
    });

  };

  const validate = () => {

    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } 
    else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.repeatPassword) {
      newErrors.repeatPassword = "Repeat password is required";
    } 
    else if (formData.repeatPassword !== formData.password) {
      newErrors.repeatPassword = "Passwords do not match";
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

    console.log("Register Data:", formData);

  };

  return (

    <div>

      <h2>Register</h2>

      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: "12px" }}>

          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
          />

          {errors.name && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.name}
            </p>
          )}

        </div>

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

        <div style={{ marginBottom: "12px" }}>

          <input
            type="password"
            name="repeatPassword"
            placeholder="Repeat your password"
            value={formData.repeatPassword}
            onChange={handleChange}
          />

          {errors.repeatPassword && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.repeatPassword}
            </p>
          )}

        </div>

        <button type="submit">Register</button>

      </form>

    </div>

  );

}

export default Register;