import { useState } from "react";
import Feed from "../components/Home/Feed";
import RecommendUsers from "../components/Home/RecommendUsers";

const HomePage = () => {
  const [isFeedEmpty, setIsFeedEmpty] = useState(false);
  return (
    <div className="home">
      <Feed setIsFeedEmpty={setIsFeedEmpty} />
      <RecommendUsers isFeedEmpty={isFeedEmpty} />
    </div>
  );
};

export default HomePage;
