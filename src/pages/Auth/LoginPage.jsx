import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/Auth";
import "../../styles/Auth.css";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { checkAuth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/auth/login`, formData, {
        withCredentials: true,
      });
      console.log("Logged in successfully --handleLogin :", response.data);
      checkAuth();
    } catch (error) {
      console.log("Login failed:", error.response.data.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    handleLogin();
  };

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
          <label className="input-label" htmlFor="email">
            Email
          </label>
          {/* <MdOutlineMailOutline className="icon-left" /> */}
          <input
            placeholder="name@mail.com"
            id="email"
            type="email"
            name="email"
            className="input-field-with-icon-left"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            Password
          </label>
          {/* {showPassword ? (
            <HiOutlineEyeOff
              className="icon-right"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <HiOutlineEye
              className="icon-right"
              onClick={togglePasswordVisibility}
            />
          )} */}
          <input
            placeholder="Password"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            className="input-field input-field-with-icon-right"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="block-level-button blue-button">
          <span>Sign In</span>
        </button>
        <div className="no-account-message">
          <Link to="/accounts/signup">
            <span>Don&apos;t have an account? Sign Up</span>
          </Link>
        </div>
        <div className="separator">
          <hr className="line" />
          <span>Or</span>
          <hr className="line" />
        </div>
        <button className="block-level-button button-with-img white-button">
          <img src="/google.png" alt="google" />
          <span>Sign In with Google</span>
        </button>
        <button className="block-level-button button-with-img black-button">
          <img src="/github.png" alt="github" />
          <span>Sign In with Github</span>
        </button>
        <p className="note">Terms of use &amp; Conditions</p>
      </form>
    </div>
  );
};

export default LoginPage;
