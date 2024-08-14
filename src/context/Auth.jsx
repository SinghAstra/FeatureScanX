import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const checkAuth = async () => {
    try {
      setIsAuthenticating(true);
      const response = await axios.post(
        `${apiUrl}/api/auth/me`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("data --checkAuth is ", response.data);
      setIsAuthenticated(response.data.isAuthenticated);
      setUser(response.data.user);
    } catch (error) {
      console.log("Failed to check authentication status --checkAuth", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsAuthenticating(false);
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticating, isAuthenticated, user, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
