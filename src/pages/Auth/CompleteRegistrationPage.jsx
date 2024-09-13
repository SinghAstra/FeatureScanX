import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Password from "../../components/Auth/Password";
import UserName from "../../components/Auth/UserName";
import { AuthContext } from "../../context/AuthContext";

const CompleteRegistrationPage = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = location.state;
  const [formData, setFormData] = useState({
    username: userData?.userName ? userData.userName : "",
    password: "",
    email: userData?.email,
    fullName: userData?.fullName,
    profilePicture: userData?.profilePicture,
    confirmPassword: "",
    bio: userData?.bio,
  });
  const apiUrl = import.meta.env.VITE_API_URL;
  const { fetchCurrentUser } = useContext(AuthContext);

  const handleNext = () => {
    setCurrentStage(currentStage + 1);
  };

  const handleBack = () => {
    setCurrentStage(currentStage - 1);
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

  useEffect(() => {
    if (!userData) {
      navigate("/accounts/signup");
    }
  }, [navigate, userData]);

  return (
    <div className="auth-form-wrapper">
      {currentStage === 1 && (
        <UserName
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
          onNext={registerUser}
        />
      )}
    </div>
  );
};

export default CompleteRegistrationPage;
