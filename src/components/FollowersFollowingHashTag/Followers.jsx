import axios from "axios";
import propTypes from "prop-types";
import { useEffect, useState } from "react";
import "../../styles/Followers.css";
import UserItem from "./UserItem";

const Followers = ({ username, setShowFFHModal }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [followers, setFollowers] = useState([]);

  const fetchFollowers = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/users/${username}/followers`,
        { withCredentials: true }
      );
      console.log(
        "response.data.followers --fetchFollowers is ",
        response.data.followers
      );
      setFollowers(response.data.followers);
    } catch (error) {
      console.log("error.message --fetchFollowers is ", error.message);
      setFollowers([]);
    }
  };

  useEffect(() => {
    fetchFollowers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);
  return (
    <div className="followers-container">
      {followers.map((user) => (
        <UserItem
          key={user._id}
          user={user}
          setShowFFHModal={setShowFFHModal}
        />
      ))}
      {!followers.length && <p>No Followers.</p>}
    </div>
  );
};

Followers.propTypes = {
  username: propTypes.string.isRequired,
};

export default Followers;