import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const apiUrl = import.meta.env.VITE_API_URL;
const currentUrl = window.location.origin + "/login";
const githubOAuthURL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${currentUrl}&scope=user`;

const GithubOAuth = () => {
  const { fetchCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const responseGithub = async (code) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/auth/github?code=${code}`
      );
      console.log("response.data --responseGithub ", response.data);
      const userExists = response.data.userExists;

      if (userExists) {
        fetchCurrentUser();
      } else {
        navigate("/accounts/complete-registration", {
          state: { userData: response.data.userData },
        });
      }
    } catch (error) {
      console.log("error --responseGithub is ", error);
    }
  };

  const handleGitHubCallback = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");

    if (code) {
      responseGithub(code);
    }
  };

  useEffect(() => {
    handleGitHubCallback();
  }, []);

  return (
    <a className="sign-in-with-github" href={githubOAuthURL}>
      <img src="/github.png" alt="github" />
      <span>Sign In with Github</span>
    </a>
  );
};

export default GithubOAuth;
