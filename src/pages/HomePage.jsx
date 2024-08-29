import Feed from "../components/Home/Feed";
import RecommendedProfile from "../components/Home/RecommendedProfile";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="home">
      <Feed />
      <RecommendedProfile />
    </div>
  );
};

export default HomePage;
