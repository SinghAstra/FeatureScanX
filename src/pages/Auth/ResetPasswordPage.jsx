import axios from "axios";
import { useState } from "react";
import Toast from "../../components/Toast/Toast";
import useTitle from "../../hooks/useTitle";
import "../../styles/Auth/ResetPasswordPage.css";

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    identifier: "",
  });
  const apiUrl = import.meta.env.VITE_API_URL;

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

      if (response.data.exists) {
        console.log("User exists, proceed with OTP sending");
        // i want to show the toast when the mail is sent
      } else {
        setErrors({ identifier: "User does not exist." });
      }
    } catch (error) {
      setErrors({ identifier: "An error occurred. Please try again." });
      console.log("Error checking if user exists: ", error);
    }
  };

  useTitle("Reset Password • Social UI");

  return (
    <form className="auth-form-container" onSubmit={handleSubmit}>
      <Toast />
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
    </form>
  );
};

export default ResetPasswordPage;
