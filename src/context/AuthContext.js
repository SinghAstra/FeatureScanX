import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verifyToken(token);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  console.log("isAuthenticated is ", isAuthenticated);
  console.log("user is ", user);

  const verifyToken = async (token) => {
    try {
      setIsAuthenticating(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/user/verify-token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsAuthenticated(true);
      setUser(response.data.user);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const saveJWT = async (token) => {
    localStorage.setItem("token", token);
    console.log("in saveJWT token is ", token);
    await verifyToken(token);
  };

  const removeJWT = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
  };

  const handleSendOTP = async (email) => {
    const toastId = toast.loading("Sending email...");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/sendOTP",
        {
          email,
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("error is ", error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setUser,
        isAuthenticating,
        saveJWT,
        removeJWT,
        handleSendOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
