import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/Auth";
// import Notification from "../Notification";

const RegistrationStage3 = ({
  formData,
  confirmationCode,
  setConfirmationCode,
  onBack,
}) => {
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  //   const [notification, setNotification] = useState("");

  const { checkAuth } = useContext(AuthContext);

  const handleChange = (e) => {
    setOtp(e.target.value);

    // Validate OTP length and content
    if (e.target.value.length === 6 && /^\d+$/.test(e.target.value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setErrors({ ...errors, [name]: "" });
  };

  const registerUser = async () => {
    try {
      // Proceed to register user
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        { withCredentials: true }
      );
      console.log(
        "User registered successfully --registerUser :",
        response.data
      );
      checkAuth();
    } catch (error) {
      console.log("Error registering user:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the entered OTP matches the generated confirmation code
    if (otp === confirmationCode) {
      registerUser();
    } else {
      // Show an error if the OTP doesn't match
      setErrors({
        ...errors,
        otp: "Invalid confirmation code. Please try again.",
      });
      setIsValid(false);
    }
  };

  const sendConfirmationCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/verify-email",
        {
          email: formData.mobileOrEmail,
        }
      );
      setConfirmationCode(response.data.confirmationCode);
      console.log(
        "Sent confirmation code --sendConfirmationCode:",
        response.data.confirmationCode
      );
    } catch (error) {
      console.log(
        "Error sending confirmation code --sendConfirmationCode:",
        error
      );
    }
  };

  const handleResendConfirmationCode = () => {
    sendConfirmationCode();

    // Reset OTP field and focus on it
    setOtp("");
    document.getElementById("otp").focus();
  };

  useEffect(() => {
    sendConfirmationCode();
  }, [formData.mobileOrEmail]);

  return (
    <form className="auth-form-container" onSubmit={handleSubmit}>
      {/* {notification && <Notification message={notification} />} */}
      <img src="/mail.png" alt="mail" className="mail-icon" />
      <div className="title-container">
        <span className="title">Enter confirmation code</span>
        <span className="subtitle">
          Enter the confirmation code that we sent to {formData.mobileOrEmail}.
          <br />
          <Link onClick={handleResendConfirmationCode}>Resend Code</Link>
        </span>
      </div>
      <div className="input-container">
        <input
          className={`input-field ${errors.otp ? "error" : ""}`}
          id="otp"
          name="otp"
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="OTP"
          type="text"
          value={otp}
        />
        {errors.otp && <p className="error-message">{errors.otp}</p>}
      </div>
      <button
        type="submit"
        className={`register-next-button ${isValid ? "" : "disabled"}`}
        disabled={!isValid}
      >
        Next
      </button>
      <button className="back-button" onClick={onBack}>
        <i className="uil uil-angle-left"></i>
      </button>
    </form>
  );
};

RegistrationStage3.propTypes = {
  formData: PropTypes.shape({
    mobileOrEmail: PropTypes.string.isRequired,
  }).isRequired,
  confirmationCode: PropTypes.string.isRequired,
  setConfirmationCode: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default RegistrationStage3;

// 1. generalise the notification component
// 2. animation for notification
// 3. loader once a button is clicked
// 4. display notification once the confirmation code is sent again
