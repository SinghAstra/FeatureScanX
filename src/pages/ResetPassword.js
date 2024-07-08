import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import user from "../assets/user.png";
import "../styles/ResetPassword.css";

const ResetPassword = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!location.state) {
    return <Navigate to="/login" />;
  }

  const { userInfo } = location.state;

  const avatarSrc = userInfo.profile ? userInfo.profile : user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const lengthRegex = /.{8,}/;
  const numberRegex = /\d/;
  const upperCaseRegex = /[A-Z]/;
  const lowerCaseRegex = /[a-z]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  const isPasswordValid = () => {
    const { password } = formData;
    return (
      lengthRegex.test(password) &&
      numberRegex.test(password) &&
      upperCaseRegex.test(password) &&
      lowerCaseRegex.test(password) &&
      specialCharRegex.test(password)
    );
  };

  const validatePassword = () => {
    const { password, confirmPassword } = formData;
    if (!isPasswordValid()) {
      toast.error("Password does not meet all conditions");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (validatePassword()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/reset-password",
          {
            email: userInfo.email,
            newPassword: formData.password,
          }
        );
        console.log("response is ", response);
        toast.success(response.data.message);
        navigate("/login");
      } catch (error) {
        console.log("error is ", error);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="reset-password-container">
      <form onSubmit={handleResetPassword} className="reset-password-form">
        <h1>Reset Password</h1>
        {(isPasswordValid() || !formData.password) && (
          <div className="reset-password-avatar-container">
            <img src={avatarSrc} alt="avatar" className="avatar" />
          </div>
        )}
        {formData.password && !isPasswordValid() && (
          <div className="password-conditions">
            Password must
            <br />
            be at least 8 characters long:{" "}
            {lengthRegex.test(formData.password) ? (
              <span className="condition valid">&#10004;</span>
            ) : (
              <span className="condition invalid">&#10006;</span>
            )}
            <br />
            contain at least one number:{" "}
            {numberRegex.test(formData.password) ? (
              <span className="condition valid">&#10004;</span>
            ) : (
              <span className="condition invalid">&#10006;</span>
            )}
            <br />
            contain at least one uppercase letter:{" "}
            {upperCaseRegex.test(formData.password) ? (
              <span className="condition valid">&#10004;</span>
            ) : (
              <span className="condition invalid">&#10006;</span>
            )}
            <br />
            contain at least one lowercase letter:{" "}
            {lowerCaseRegex.test(formData.password) ? (
              <span className="condition valid">&#10004;</span>
            ) : (
              <span className="condition invalid">&#10006;</span>
            )}
            <br />
            contain at least one special character:{" "}
            {specialCharRegex.test(formData.password) ? (
              <span className="condition valid">&#10004;</span>
            ) : (
              <span className="condition invalid">&#10006;</span>
            )}
          </div>
        )}
        <div className="input-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="off"
            id="password"
            placeholder="Password"
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="input-icon"
            onClick={togglePasswordVisibility}
          />
        </div>
        {formData.password && isPasswordValid() && (
          <div className="input-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="off"
              id="confirmPassword"
              placeholder="Confirm Password"
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              className="input-icon"
              onClick={toggleConfirmPasswordVisibility}
            />
          </div>
        )}
        <button type="submit" className="btn-submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
