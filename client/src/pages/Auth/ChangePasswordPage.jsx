import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import CorrectIcon from "../../icons/CorrectIcon";
import WrongIcon from "../../icons/WrongIcon";
import SplashScreen from "../../Skeleton/SplashScreen.jsx";

const ChangePasswordPage = () => {
  const { token } = useParams();
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    minValueValidation: false,
    numberValidation: false,
    capitalLetterValidation: false,
    specialCharacterValidation: false,
  });
  const [passwordsMatchError, setPasswordsMatchError] = useState(false);
  const { fetchCurrentUser } = useContext(AuthContext);

  const isPasswordValid =
    errors.minValueValidation &&
    errors.numberValidation &&
    errors.capitalLetterValidation &&
    errors.specialCharacterValidation;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "password") {
      validatePassword(value);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    if (name === "confirmPassword") {
      validatePasswordMatch();
    }
  };

  const validatePasswordMatch = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatchError("Passwords do not match");
    } else {
      setPasswordsMatchError("");
    }
  };

  const handleFocus = () => {
    setPasswordsMatchError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const validatePassword = (password) => {
    setErrors({
      minValueValidation: password.length >= 8,
      numberValidation: /\d/.test(password),
      capitalLetterValidation: /[A-Z]/.test(password),
      specialCharacterValidation: /[^A-Za-z0-9]/.test(password),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validatePasswordMatch();
    if (isPasswordValid && passwordsMatchError === "") {
      try {
        const response = await axios.post(
          `${apiUrl}/api/auth/reset-password/${token}`,
          {
            password: formData.password,
          },
          {
            withCredentials: true,
          }
        );
        fetchCurrentUser();
        console.log("response.data --handleSubmit is ", response.data);
      } catch (error) {
        console.log("error --handleSubmit is :", error);
      }
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/auth/user-info-using-forget-password-token/${token}`
        );
        setUser(response.data);
      } catch (err) {
        console.log("error --fetchUserInfo:", err);
        setError("Invalid token or user not found");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [apiUrl, token]);

  if (loading) {
    return <SplashScreen />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <form className="auth-form-container" onSubmit={handleSubmit}>
      {user.profilePicture ? (
        <img
          src={user.profilePicture}
          alt={user.userName}
          className="user-avatar"
        />
      ) : (
        <span className="user-avatar">{user.fullName[0]}</span>
      )}
      <span className="title">{user.userName}</span>
      <div className="input-container">
        <label
          className={`input-label ${errors.password ? "error" : ""}`}
          htmlFor="password"
        >
          New Password
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
          placeholder="New Password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          autoComplete="off"
        />
      </div>
      {!isPasswordValid && (
        <div className="password-validation-items">
          {Object.entries(errors).map(([key, value]) => (
            <div key={key} className="password-validation-item">
              {value ? (
                <CorrectIcon wrapperClass="icon icon-success" />
              ) : (
                <WrongIcon wrapperClass="icon icon-error" />
              )}
              <p
                className={`error-message ${
                  value ? "text-success" : "text-error"
                }`}
              >
                {key === "minValueValidation" &&
                  "Password must be at least 8 Characters"}
                {key === "numberValidation" &&
                  "Password must have at least one Number"}
                {key === "capitalLetterValidation" &&
                  "Password must have at least one Capital Letter"}
                {key === "specialCharacterValidation" &&
                  "Password must have at least one Special Character"}
              </p>
            </div>
          ))}
        </div>
      )}
      {isPasswordValid && (
        <div className="input-container">
          <label
            className={`input-label ${passwordsMatchError ? "error" : ""}`}
            htmlFor="confirmPassword"
          >
            Confirm New Password
          </label>
          {showConfirmPassword ? (
            <i
              className={`uil uil-eye icon-right ${
                passwordsMatchError ? "error" : ""
              }`}
              onClick={toggleConfirmPasswordVisibility}
            ></i>
          ) : (
            <i
              className={`uil uil-eye-slash icon-right ${
                passwordsMatchError ? "error" : ""
              }`}
              onClick={toggleConfirmPasswordVisibility}
            ></i>
          )}
          <input
            className={`input-field-with-icon-right ${
              passwordsMatchError ? "error" : ""
            }`}
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder="Confirm New Password"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            autoComplete="off"
          />
          {passwordsMatchError && (
            <p className="error-message">{passwordsMatchError}</p>
          )}
        </div>
      )}
      <button type="submit" className="change-password-button">
        Change Password
      </button>
    </form>
  );
};

export default ChangePasswordPage;
