import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

const UserInfo = ({ formData, setFormData, onNext }) => {
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
    if (name === "email") {
      error = await validateEmail(value);
    } else if (name === "fullName") {
      error = validateFullName(value);
    } else if (name === "username") {
      error = await validateUsername(value);
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setErrors({ ...errors, [name]: "" });
  };

  const checkEmailAvailability = async (value) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/check-user-exists`,
        {
          identifier: value,
        }
      );
      console.log("response.data --checkEmailAvailability is ", response.data);
      return !response.data.exists ? "" : "Email is already taken.";
    } catch (error) {
      console.log("error --checkEmailAvailability is :", error);
    }
  };

  const checkUsernameAvailability = async (value) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/check-user-exists`,
        {
          identifier: value,
        }
      );
      console.log(
        "response.data --checkUsernameAvailability is ",
        response.data
      );
      return !response.data.exists ? "" : "Username is already taken.";
    } catch (error) {
      console.log("error --checkUsernameAvailability is :", error);
    }
  };

  const validateEmail = async (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (value.trim() === "") {
      return "Email is required.";
    } else if (emailRegex.test(value)) {
      return checkEmailAvailability(value);
    } else {
      return "Invalid Email address.";
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
      return checkUsernameAvailability(value);
    } else {
      return "Username must be 3-15 characters long and can only contain letters, numbers, and underscores.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = await validateEmail(formData.email);
    const nameError = validateFullName(formData.fullName);
    const usernameError = await validateUsername(formData.username);
    if (emailError || nameError || usernameError) {
      setErrors({
        email: emailError,
        fullName: nameError,
        username: usernameError,
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
            className={`input-label ${errors.email ? "error" : ""}`}
            htmlFor="email"
          >
            Email
          </label>
          <i
            className={`uil uil-envelope-alt icon-left ${
              errors.email ? "error" : ""
            }`}
          ></i>
          <input
            className={`input-field-with-icon-left ${
              errors.email ? "error" : ""
            }`}
            id="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder="name@email.com"
            type="text"
            value={formData.email}
            autoComplete="off"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
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

UserInfo.propTypes = {
  formData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default UserInfo;
