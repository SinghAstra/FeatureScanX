import { useState } from "react";
import DateOfBirth from "../../components/Auth/DateOfBirth";
import Password from "../../components/Auth/Password";
import TwoFactorAuth from "../../components/Auth/TwoFactorAuth";
import UserInfo from "../../components/Auth/UserInfo";
import useTitle from "../../hooks/useTitle";

const RegisterPage = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleNext = () => {
    setCurrentStage(currentStage + 1);
  };

  const handleBack = () => {
    setCurrentStage(currentStage - 1);
  };

  useTitle("Sign Up • Social UI");

  return (
    <div className="auth-form-wrapper">
      {currentStage === 1 && (
        <UserInfo
          formData={formData}
          setFormData={setFormData}
          onNext={handleNext}
        />
      )}
      {currentStage === 2 && (
        <Password
          formData={formData}
          setFormData={setFormData}
          onBack={handleBack}
          onNext={handleNext}
        />
      )}
      {currentStage === 3 && (
        <DateOfBirth
          onNext={handleNext}
          onBack={handleBack}
          setFormData={setFormData}
        />
      )}
      {currentStage === 4 && (
        <TwoFactorAuth formData={formData} onBack={handleBack} />
      )}
    </div>
  );
};

export default RegisterPage;
