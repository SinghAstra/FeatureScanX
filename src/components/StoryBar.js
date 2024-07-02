import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/StoryBar.css";

const StoryBar = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://randomuser.me/api/?results=10"
        );
        setStories(response.data.results);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="story-bar">
      {stories.map((story, index) => (
        <div className="story" key={index}>
          <div className="story-image">
            <img src={story.picture.thumbnail} alt="story" />
          </div>
          <div className="story-text">{story.login.username}</div>
        </div>
      ))}
    </div>
  );
};

export default StoryBar;
