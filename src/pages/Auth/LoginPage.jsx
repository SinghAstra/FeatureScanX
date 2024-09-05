import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useTitle from "../../hooks/useTitle";
import "../../styles/Auth.css";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { fetchCurrentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    let error = "";
    if (name === "identifier") {
      error = await validateIdentifier(value);
    } else if (name === "password") {
      error = validatePassword(value);
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setErrors({ ...errors, [name]: "" });
  };

  const validateIdentifier = async (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.trim() === "") {
      return "Email or Username is required.";
    } else if (!emailRegex.test(value) && value.trim().length < 3) {
      return "Please enter a valid username or email.";
    }
  };

  const validatePassword = (value) => {
    if (value.trim() === "") {
      return "Password is required.";
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/auth/login`, formData, {
        withCredentials: true,
      });
      console.log("response.data --handleLogin is :", response.data);
      fetchCurrentUser();
    } catch (error) {
      console.log("error --handleLogin is :", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const identifierError = await validateIdentifier(formData.identifier);
    const passwordError = validatePassword(formData.password);
    if (identifierError || passwordError) {
      setErrors({
        identifier: identifierError,
        password: passwordError,
      });
      return;
    }
    handleLogin();
  };

  useTitle("Log In • Social UI");

  return (
    <div className="auth-form-wrapper">
      <form className="auth-form-container" onSubmit={handleFormSubmit}>
        <div className="logo-container">
          <img src="/social.png" alt="logo" />
        </div>
        <div className="title-container">
          <p className="title">Welcome Back!</p>
          <span className="subtitle">
            Log in to your account to continue your journey. Connect with
            friends, explore new content, and stay updated.
          </span>
        </div>
        <div className="input-container">
          <label
            className={`input-label ${errors.identifier ? "error" : ""}`}
            htmlFor="identifier"
          >
            Email or Username
          </label>
          <i
            className={`uil uil-user icon-left ${
              errors.identifier ? "error" : ""
            }`}
          ></i>
          <input
            placeholder="Email or Username"
            id="identifier"
            name="identifier"
            className={`input-field-with-icon-left ${
              errors.identifier ? "error" : ""
            }`}
            value={formData.identifier}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            autoComplete="off"
          />
          {errors.identifier && (
            <p className="error-message">{errors.identifier}</p>
          )}
        </div>
        <div className="input-container">
          <label
            className={`input-label ${errors.password ? "error" : ""}`}
            htmlFor="password"
          >
            Password
          </label>
          {showPassword ? (
            <i
              className={`uil uil-eye icon-right ${
                errors.password ? "error" : ""
              }`}
              onClick={togglePasswordVisibility}
            ></i>
          ) : (
            <i
              className={`uil uil-eye-slash icon-right ${
                errors.password ? "error" : ""
              }`}
              onClick={togglePasswordVisibility}
            ></i>
          )}
          <input
            placeholder="Password"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            className={`input-field input-field-with-icon-right ${
              errors.password ? "error" : ""
            }`}
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>
        <button type="submit" className="sign-in-button">
          <span>Sign In</span>
        </button>
        <div className="separator">
          <hr className="line" />
          <span>Or</span>
          <hr className="line" />
        </div>
        <button
          className="sign-in-with-google"
          onClick={() => console.log("Hey")}
        >
          <img src="/google.png" alt="google" />
          <span>Sign In with Google</span>
        </button>
        <button className="sign-in-with-github">
          <img src="/github.png" alt="github" />
          <span>Sign In with Github</span>
        </button>
        <p className="note">Terms of use &amp; Conditions</p>
      </form>
      <div className="auth-form-footer-container">
        <p>
          Don&#039; t have an account ?{" "}
          <Link to={"/accounts/signup"}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
