import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const RegistrationStage3 = ({ formData, onBack }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const { fetchCurrentUser } = useContext(AuthContext);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Validate OTP length and content
  const handleChange = (e) => {
    setOtp(e.target.value);
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
      const response = await axios.post(
        `${apiUrl}/api/auth/register`,
        formData,
        { withCredentials: true }
      );
      console.log("response.data --registerUser is :", response.data);
      fetchCurrentUser();
    } catch (error) {
      console.log("error --registerUser is :", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${apiUrl}/api/otp/verify`,
        {
          otp: otp,
          // check: formData.email,
          check: "singhisabhaypratap@gmail.com",
        },
        { withCredentials: true }
      );

      console.log("response.data --handleSubmit is :", response.data);
      registerUser();
    } catch (error) {
      console.log("error --handleSubmit is :", error);
      setErrors({
        ...errors,
        otp:
          error.response?.data?.message ||
          "OTP verification failed. Please try again.",
      });
    }
  };

  const sendConfirmationCode = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/otp/send-email`,
        {
          // email: formData.email,
          email: "singhisabhaypratap@gmail.com",
          type: "2FA",
        },
        { withCredentials: true }
      );
      console.log("response.data --sendConfirmationCode is : ", response.data);
    } catch (error) {
      console.log("error --sendConfirmationCode is :", error);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.email]);

  return (
    <form className="auth-form-container" onSubmit={handleSubmit}>
      <img src="/secure.png" alt="secure" className="secure-icon" />
      <span className="title">2 Factor Authentication</span>
      <span className="title-dialog">
        Enter the 6 digit OTP sent to {formData.email}.
        <br />
        <Link onClick={handleResendConfirmationCode}>Resend Code</Link>
      </span>
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
      {/* <div className="otp-digits">
        {otp.map((digit, index) => (
          <input
             key={index}
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
            ref={(reference) => (otpBoxReference.current[index] = reference)}
            className={`otp-digit ${otpError ? "error-show" : ""}`}
            className="otp-digit"
          />
         ))}
      </div> */}
      <div className="otp-digits">
        {otp.map((digit, index) => (
          <input
            key={index}
            className={`otp-digit ${errors.otp ? "error" : ""}`}
            maxLength={1}
          ></input>
        ))}
      </div>
      {/* <p className={`otp-error ${otpError ? "error-show" : ""}`}>{otpError}</p> */}
      {/* <button
        type="submit"
        className={`register-next-button ${isValid ? "" : "disabled"}`}
        disabled={!isValid}
      >
        Next
      </button> */}
      <button className="back-button" onClick={onBack}>
        <i className="uil uil-angle-left"></i>
      </button>
    </form>
  );
};

RegistrationStage3.propTypes = {
  formData: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};

export default RegistrationStage3;
