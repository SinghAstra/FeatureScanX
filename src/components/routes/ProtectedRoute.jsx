import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/Auth";
import SplashScreen from "../../screens/SplashScreen";

const ProtectedRoute = () => {
  const { isAuthenticated, isAuthenticating } = useContext(AuthContext);

  if (isAuthenticating) {
    return <SplashScreen />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;