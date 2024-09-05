import PropTypes from "prop-types";
import { useState } from "react";

const Password = ({ formData, setFormData, onNext }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  //   const validatePassword = (value) => {
  //     const passwordRegex =
  //       /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
  //     if (value.trim() === "") {
  //       return "Password is required.";
  //     } else if (passwordRegex.test(value)) {
  //       return "";
  //     } else {
  //       return "Password must be 6-20 characters long and include at least one letter, one number, and one special character.";
  //     }
  //   };

  // const passwordError = validatePassword(formData.password);
  // Implement handleBlur & handleFocus

  return (
    <form className="auth-form-container">
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
          //   onBlur={handleBlur}
          //   onFocus={handleFocus}
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          autoComplete="off"
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>
      <div className="input-container">
        <label
          className={`input-label ${errors.confirmPassword ? "error" : ""}`}
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        {showConfirmPassword ? (
          <i
            className={`uil uil-eye icon-right ${
              errors.confirmPassword ? "error" : ""
            }`}
            onClick={toggleConfirmPasswordVisibility}
          ></i>
        ) : (
          <i
            className={`uil uil-eye-slash icon-right ${
              errors.confirmPassword ? "error" : ""
            }`}
            onClick={toggleConfirmPasswordVisibility}
          ></i>
        )}
        <input
          className={`input-field-with-icon-right ${
            errors.confirmPassword ? "error" : ""
          }`}
          id="confirmPassword"
          name="confirmPassword"
          onChange={handleChange}
          //   onBlur={handleBlur}
          //   onFocus={handleFocus}
          placeholder="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          value={formData.confirmPassword}
          autoComplete="off"
        />
        {errors.confirmPassword && (
          <p className="error-message">{errors.confirmPassword}</p>
        )}
      </div>
      <button type="submit" className="register-next-button">
        Next
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
};

export default Password;
