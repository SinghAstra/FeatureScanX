import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default PublicRoute;
