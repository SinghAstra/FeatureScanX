import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContext } from "../../context/ToastContext";
import useTitle from "../../hooks/useTitle";

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    identifier: "",
  });
  const apiUrl = import.meta.env.VITE_API_URL;
  const { showToast } = useContext(ToastContext);
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
    if (name === "identifier") {
      error = await validateIdentifier(value);
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validateIdentifier = async (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.trim() === "") {
      return "Email or Username is required.";
    } else if (!emailRegex.test(value) && value.trim().length < 3) {
      return "Please enter a valid username or email.";
    }
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const identifierError = await validateIdentifier(formData.identifier);
    if (identifierError) {
      setErrors({
        identifier: identifierError,
      });
      return;
    }
    sendRecoverAccountOTP();
  };

  const sendRecoverAccountOTP = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/auth/forget-password`, {
        identifier: formData.identifier,
      });

      console.log("response.data --sendRecoverAccountOTP is ", response.data);

      if (response.data.exists) {
        showToast(
          `We've sent an email to ${response.data.email} with a link to get back into your account.`
        );
      } else {
        setErrors({ identifier: "No User Found." });
      }
    } catch (error) {
      setErrors({ identifier: "An error occurred. Please try again." });
      console.log("error --sendRecoverAccountOTP is ", error);
    }
  };

  useTitle("Reset Password • Social UI");

  return (
    <div className="auth-form-wrapper">
      <form className="auth-form-container" onSubmit={handleSubmit}>
        <img src="/secure.png" alt="secure" className="secure-icon" />
        <span className="title">Trouble with logging in ?</span>
        <span className="subtitle">
          Enter your email address or username, and we&apos;ll send you a OTP to
          get back into your account.
        </span>
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
        <button type="submit" className="send-otp-button">
          Send Login Link
        </button>
        <div className="separator">
          <hr className="line" />
          <span>Or</span>
          <hr className="line" />
        </div>
        <Link className="create-new-account-link" to="/accounts/signup">
          Create New Account
        </Link>
      </form>
      <div className="auth-form-footer-container">
        <p>
          <Link to={"/login"}>Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
