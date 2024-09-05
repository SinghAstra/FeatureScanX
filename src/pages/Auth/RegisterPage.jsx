import { useState } from "react";
import RegistrationStage1 from "../../components/Auth/RegistrationStage1";
import RegistrationStage2 from "../../components/Auth/RegistrationStage2";
import RegistrationStage3 from "../../components/Auth/RegistrationStage3";
import useTitle from "../../hooks/useTitle";

const RegisterPage = () => {
  const [currentStage, setCurrentStage] = useState(3);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    username: "",
    password: "",
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
        <RegistrationStage3 formData={formData} onBack={handleBack} />
      )}
    </div>
  );
};

export default RegisterPage;
