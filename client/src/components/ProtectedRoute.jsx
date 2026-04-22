import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("authToken");
  const location = useLocation();

  if (!token) {
    // Store the intended destination before redirecting to login
    localStorage.setItem("redirectAfterLogin", location.pathname);
    return <Navigate to="/login" />;
  }

  return children;
}