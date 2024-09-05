import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const RegistrationStage3 = ({ formData, onBack }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [errors, setErrors] = useState({});
  const { fetchCurrentUser } = useContext(AuthContext);
  const apiUrl = import.meta.env.VITE_API_URL;
  const otpBoxReference = useRef([]);

  // Validate OTP length and content
  const handleChange = (value, index) => {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < 5) {
      otpBoxReference.current[index + 1].focus();
    }
  };

  const handleFocus = () => {
    setErrors({ ...errors, otp: "" });
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

  const verifyOTP = async () => {
    try {
      let otpString = "";
      for (let i = 0; i < otp.length; i++) {
        console.log("otp[i] is ", otp[i]);
        otpString += otp[i].toString();
      }

      console.log("otpString is ", otpString);

      const response = await axios.post(
        `${apiUrl}/api/otp/verify`,
        {
          otp: otpString,
          check: formData.email,
        },
        { withCredentials: true }
      );

      otpBoxReference.current.forEach((input) => {
        input.classList.add("valid");
      });

      setTimeout(() => {
        registerUser();
      }, 1000);

      console.log("response.data --verifyOTP is :", response.data);
    } catch (error) {
      console.log("error --verifyOTP is :", error);
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
          email: formData.email,
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

  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < 5) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  useEffect(() => {
    sendConfirmationCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.email]);

  useEffect(() => {
    for (let i = 0; i < otp.length; i++) {
      console.log("otp[i]: ", otp[i]);
    }
  }, [otp]);

  return (
    <div className="auth-form-container">
      <img src="/secure.png" alt="secure" className="secure-icon" />
      <span className="title">2 Factor Authentication</span>
      <span className="title-dialog">
        OTP sent to <span className="check">{formData.email}</span>.
        <br />
        <Link onClick={handleResendConfirmationCode}>Resend Code</Link>
      </span>
      <div className="otp-digits">
        {otp.map((digit, index) => (
          <input
            key={index}
            className={`otp-digit delay-${index + 1} ${
              errors.otp ? "error" : ""
            }`}
            maxLength={1}
            onFocus={handleFocus}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
            ref={(reference) => (otpBoxReference.current[index] = reference)}
          ></input>
        ))}
      </div>
      {errors.otp && <p className="error-message">{errors.otp}</p>}
      <button className="back-button" onClick={onBack}>
        <i className="uil uil-angle-left"></i>
      </button>
    </div>
  );
};

RegistrationStage3.propTypes = {
  formData: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};

export default RegistrationStage3;
