import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();
  console.log("Loading:", loading);
  console.log("Is Authenticated:", isAuthenticated);

  if (loading) return <h1>Loading... </h1>;

  if (!isAuthenticated) {
    console.log("Redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;



