import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SplashScreen from "../../Skeleton/SplashScreen";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, isAuthenticating } = useContext(AuthContext);

  if (isAuthenticating) {
    return <SplashScreen />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
