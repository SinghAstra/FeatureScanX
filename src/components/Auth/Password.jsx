import PropTypes from "prop-types";
import { useState } from "react";
import CorrectIcon from "../../icons/CorrectIcon";
import WrongIcon from "../../icons/WrongIcon";

const Password = ({ formData, setFormData, onBack, onNext }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    minValueValidation: false,
    numberValidation: false,
    capitalLetterValidation: false,
    specialCharacterValidation: false,
  });
  const [passwordsMatchError, setPasswordsMatchError] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    validatePasswordMatch();
    if (isPasswordValid && passwordsMatchError === "") {
      onNext();
    }
  };

  return (
    <form className="auth-form-container" onSubmit={handleSubmit}>
      <div className="logo-container">
        <img src="/social.png" alt="logo" />
      </div>
      <div className="input-container">
        <label
          className={`input-label ${errors.password ? "error" : ""}`}
          htmlFor="password"
        >
          Password
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
          placeholder="Password"
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
            Confirm Password
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
            placeholder="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            autoComplete="off"
          />
          {passwordsMatchError && (
            <p className="error-message">{passwordsMatchError}</p>
          )}
        </div>
      )}
      {isPasswordValid && (
        <button type="submit" className="register-next-button">
          Next
        </button>
      )}
      <button className="back-button" onClick={onBack}>
        <i className="uil uil-angle-left"></i>
      </button>
    </form>
  );
};

Password.propTypes = {
  formData: PropTypes.shape({
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default Password;
