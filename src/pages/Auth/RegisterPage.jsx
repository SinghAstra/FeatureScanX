import { useState } from "react";
import RegistrationStage1 from "../../components/Auth/RegistrationStage1";
import RegistrationStage2 from "../../components/Auth/RegistrationStage2";
import RegistrationStage3 from "../../components/Auth/RegistrationStage3";
import useTitle from "../../hooks/useTitle";

const RegisterPage = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [formData, setFormData] = useState({
    mobileOrEmail: "",
    fullName: "",
    username: "",
    password: "",
  });
  const [confirmationCode, setConfirmationCode] = useState("");

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
        <RegistrationStage1
          formData={formData}
          setFormData={setFormData}
          onNext={handleNext}
        />
      )}
      {currentStage === 2 && (
        <RegistrationStage2
          onNext={handleNext}
          onBack={handleBack}
          setFormData={setFormData}
        />
      )}
      {currentStage === 3 && (
        <RegistrationStage3
          confirmationCode={confirmationCode}
          setConfirmationCode={setConfirmationCode}
          formData={formData}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default RegisterPage;
