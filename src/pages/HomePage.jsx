import Feed from "../components/Home/Feed";
import RecommendUsers from "../components/Home/RecommendUsers";

const HomePage = () => {
  return (
    <div className="home">
      <Feed />
      <RecommendUsers />
    </div>
  );
};

export default HomePage;
