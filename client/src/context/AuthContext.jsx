import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchCurrentUser = async () => {
    try {
      setIsAuthenticating(true);
      const response = await axios.post(
        `${apiUrl}/api/auth/me`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("data --fetchCurrentUser is ", response.data);
      setIsAuthenticated(response.data.isAuthenticated);
      setCurrentUser(response.data.user);
    } catch (error) {
      console.log(
        "Failed to check authentication status --fetchCurrentUser",
        error
      );
      setIsAuthenticated(false);
      setCurrentUser(null);
    } finally {
      setIsAuthenticating(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticating,
        isAuthenticated,
        currentUser,
        setCurrentUser,
        fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
