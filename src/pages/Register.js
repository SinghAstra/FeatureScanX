import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import user from "../assets/user.png";
import { AuthContext } from "../context/AuthContext";
import "../styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "root",
    email: "singhisabhaypratap@gmail.com",
    password: "Abhay@codeman1",
    picture: "",
    confirmPassword: "Abhay@codeman1",
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { saveJWT } = useContext(AuthContext);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const pictureUrl = URL.createObjectURL(file);
      setProfilePicture(pictureUrl);
      setFormData({
        ...formData,
        picture: file,
      });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return false;
    }
    return true;
  };

  const validatePicture = (picture) => {
    if (!picture) {
      toast.error("Please upload a profile picture.");
      return false;
    }
    return true;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    return true;
  };

  const validateFormData = () => {
    const { username, email, password, picture, confirmPassword } = formData;

    return (
      validateEmail(email) &&
      validatePassword(password) &&
      validateConfirmPassword(password, confirmPassword) &&
      validatePicture(picture)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFormData()) {
      return;
    }

    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/user/register`,
        data
      );
      toast.success(response.data.message);
      saveJWT(response.data.token);
    } catch (error) {
      console.log("error is ", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h1>Register</h1>
      <div className="avatar-container">
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="fileInput"
          onChange={handlePictureChange}
        />
        <label htmlFor="fileInput">
          <div className="profile-picture-container">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="profile-picture"
              />
            ) : (
              <img
                src={user}
                alt="Profile"
                className="profile-picture-placeholder"
              />
            )}
          </div>
        </label>
      </div>
      <div className="input-container">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          autoComplete="off"
          id="username"
          placeholder="Username"
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="off"
          id="email"
          placeholder="Email"
        />
      </div>
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
          onClick={toggleShowPassword}
        />
      </div>
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
          onClick={toggleShowConfirmPassword}
        />
      </div>
      <button type="submit" className="btn-submit">
        Submit
      </button>
      <p className="bottom-text">
        Already a member ?{" "}
        <Link to="/login" className="bottom-link">
          Login
        </Link>
      </p>
    </form>
  );
};

export default Register;
