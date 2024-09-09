import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserName = ({ formData, setFormData, onNext }) => {
  const [errors, setErrors] = useState({});
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

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
    if (name === "username") {
      error = await validateUsername(value);
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setErrors({ ...errors, [name]: "" });
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
  };

  return (
    <form className="auth-form-container" onSubmit={handleSubmit}>
      {formData.profilePicture ? (
        <img
          src={formData.profilePicture}
          alt={formData.username}
          className="user-avatar"
        />
      ) : (
        <span className="user-avatar">{formData.fullName[0]}</span>
      )}
      <div className="input-container">
        <label
          className={`input-label ${errors.username ? "error" : ""}`}
          htmlFor="username"
        >
          Username
        </label>
        <i
          className={`uil uil-user icon-left ${errors.username ? "error" : ""}`}
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
        {errors.username && <p className="error-message">{errors.username}</p>}
      </div>
      <button type="submit" className="register-next-button">
        Next
      </button>
    </form>
  );
};

export default UserName;
