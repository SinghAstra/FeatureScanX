import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";

const UserName = ({ formData, setFormData, onNext }) => {
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
    const usernameError = await validateUsername(formData.username);
    if (usernameError) {
      setErrors({
        username: usernameError,
      });
      return;
    }
    onNext();
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

UserName.propTypes = {
  formData: PropTypes.shape({
    username: PropTypes.string,
    fullName: PropTypes.string,
    profilePicture: PropTypes.string,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default UserName;
