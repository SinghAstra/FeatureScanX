import React, { useEffect, useState } from "react";
import "../styles/FeedSidebar.css";

const FeedSidebar = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=5")
      .then((response) => response.json())
      .then((data) => setUsers(data.results))
      .catch((error) => console.log("Error fetching data: ", error));
  }, []);

  return (
    <div className="feed-sidebar">
      <div className="feed-sidebar-header">
        <span>Suggested For You</span>
        <span className="sidebar-action">See All</span>
      </div>
      {users.map((user, index) => (
        <div key={index} className="feed-sidebar-profile">
          <div className="feed-sidebar-profile-picture">
            <img
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
              className="feed-profile-image"
            />
          </div>
          <div className="feed-sidebar-profile-info">
            <div className="feed-profile-username">{user.login.username}</div>
          </div>
          <div className="feed-sidebar-profile-actions">
            <button className="sidebar-action">Follow</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedSidebar;
