import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

const RegistrationStage1 = ({ formData, setFormData, onNext }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

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
    if (name === "mobileOrEmail") {
      error = await validateEmailOrMobile(value);
    } else if (name === "fullName") {
      error = validateFullName(value);
    } else if (name === "username") {
      error = await validateUsername(value);
    } else if (name === "password") {
      error = validatePassword(value);
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setErrors({ ...errors, [name]: "" });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validateEmailOrMobile = async (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^[0-9]{10,15}$/;
    if (value.trim() === "") {
      return "Email or mobile number is required.";
    } else if (emailRegex.test(value) || mobileRegex.test(value)) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/check-availability",
          {
            mobileOrEmail: value,
          }
        );
        console.log("response.data is ", response.data);
        return response.data.isAvailable
          ? ""
          : "Email or mobile number is already taken.";
      } catch (error) {
        console.log("Error checking availability:", error);
        return "Error checking availability.";
      }
    } else {
      return "Invalid email address or mobile number.";
    }
  };

  const validateFullName = (value) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (value.trim() === "") {
      return "Full name is required.";
    } else if (!nameRegex.test(value)) {
      return "Full name can only contain letters and spaces.";
    } else {
      return "";
    }
  };

  const validateUsername = async (value) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
    if (value.trim() === "") {
      return "Username is required.";
    } else if (usernameRegex.test(value)) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/check-availability",
          {
            username: value,
          }
        );
        console.log("response.data is ", response.data);
        return response.data.isAvailable ? "" : "Username is already taken.";
      } catch (error) {
        console.error("Error checking availability:", error);
        return "Error checking availability.";
      }
    } else {
      return "Username must be 3-15 characters long and can only contain letters, numbers, and underscores.";
    }
  };

  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
    if (value.trim() === "") {
      return "Password is required.";
    } else if (passwordRegex.test(value)) {
      return "";
    } else {
      return "Password must be 6-20 characters long and include at least one letter, one number, and one special character.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = await validateEmailOrMobile(formData.mobileOrEmail);
    const nameError = validateFullName(formData.fullName);
    const usernameError = await validateUsername(formData.username);
    const passwordError = validatePassword(formData.password);
    if (emailError || nameError || usernameError || passwordError) {
      setErrors({
        mobileOrEmail: emailError,
        fullName: nameError,
        username: usernameError,
        password: passwordError,
      });
      return;
    }
    onNext();
  };

  return (
    <>
      <form className="auth-form-container" onSubmit={handleSubmit}>
        <div className="logo-container">
          <img src="/social.png" alt="logo" />
        </div>
        <div className="title-container">
          <span className="title">Social UI</span>
          <span className="subtitle">
            Sign up to see photos and videos <br /> from your friends
          </span>
        </div>
        <div className="input-container">
          <label
            className={`input-label ${errors.mobileOrEmail ? "error" : ""}`}
            htmlFor="mobileOrEmail"
          >
            Mobile Number or Email Address
          </label>
          <i
            className={`uil uil-envelope-alt icon-left ${
              errors.mobileOrEmail ? "error" : ""
            }`}
          ></i>
          <input
            className={`input-field-with-icon-left ${
              errors.mobileOrEmail ? "error" : ""
            }`}
            id="mobileOrEmail"
            name="mobileOrEmail"
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder="Mobile Number or Email Address"
            type="text"
            value={formData.mobileOrEmail}
            autoComplete="off"
          />
          {errors.mobileOrEmail && (
            <p className="error-message">{errors.mobileOrEmail}</p>
          )}
        </div>
        <div className="input-container">
          <label
            className={`input-label ${errors.fullName ? "error" : ""}`}
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            className={`input-field ${errors.fullName ? "error" : ""}`}
            id="fullName"
            name="fullName"
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder="Full Name"
            type="text"
            value={formData.fullName}
            autoComplete="off"
          />
          {errors.fullName && (
            <p className="error-message">{errors.fullName}</p>
          )}
        </div>
        <div className="input-container">
          <label
            className={`input-label ${errors.username ? "error" : ""}`}
            htmlFor="username"
          >
            Username
          </label>
          <i
            className={`uil uil-user icon-left ${
              errors.username ? "error" : ""
            }`}
          ></i>
          <input
            className={`input-field-with-icon-left ${
              errors.username ? "error" : ""
            }`}
            id="username"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder="username"
            type="text"
            value={formData.username}
            autoComplete="off"
          />
          {errors.username && (
            <p className="error-message">{errors.username}</p>
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
            className={`input-field-with-icon-right ${
              errors.password ? "error" : ""
            }`}
            id="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            autoComplete="off"
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>
        <button type="submit" className="register-next-button">
          Next
        </button>
      </form>
      <div className="auth-form-footer-container">
        <p>
          Already a member ? <Link to={"/login"}>Log in</Link>
        </p>
      </div>
    </>
  );
};

RegistrationStage1.propTypes = {
  formData: PropTypes.shape({
    mobileOrEmail: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default RegistrationStage1;
