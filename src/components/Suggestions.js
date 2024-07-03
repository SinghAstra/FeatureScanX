import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "../styles/Suggestions.css";

const Suggestions = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=15")
      .then((response) => response.json())
      .then((data) => setUsers(data.results))
      .catch((error) => console.log("Error fetching data: ", error));
  }, []);

  console.log("users is ", users);
  return (
    <div className="suggestions">
      <div className="suggestions-header">
        <div className="suggestions-title">
          <span>Suggestions For You</span>
        </div>
        <div className="see-all-link">
          <a href="http://localhost:3000/explore/people/">See All</a>
        </div>
      </div>
      <div className="suggestions-list">
        {users.map((user, index) => (
          <div key={index} className="suggestion-item">
            <div className="suggestion-item-header">
              <div className="close-icon">
                <FontAwesomeIcon icon={faClose} />
              </div>
              <div className="user-profile-pic">
                <img src={user.picture.thumbnail} alt="user-profile" />
              </div>
              <div className="username">
                <span>{user.login.username}</span>
              </div>
              <div className="suggestion-text">
                <span>Suggested For You</span>
              </div>
            </div>
            <hr />
            <div className="follow-button">
              <span>Follow</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
