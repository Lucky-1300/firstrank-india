import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isAuthenticated, ready } = useAuth();

  if (!ready) {
    return <LoadingSpinner fullScreen label="Checking your session..." />;
  }

  // if (!isAuthenticated) {
  //   // Store the intended destination before redirecting to login
  //   localStorage.setItem("redirectAfterLogin", location.pathname);
  //   return <Navigate to="/login" />;
  // }
const token = localStorage.getItem("token");

if (!token || !isAuthenticated) {
  localStorage.setItem("redirectAfterLogin", location.pathname);
  return <Navigate to="/login" replace />;
}
  return children;
}