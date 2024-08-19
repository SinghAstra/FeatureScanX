import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import EmptyFollowers from "../../placeholders/FollowersFollowingHashtag/EmptyFollowers";
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
      console.log("response.data --fetchFollowers is ", response.data);
      setFollowers(response.data.followers);
    } catch (error) {
      console.log("error --fetchFollowers is ", error);
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
      {!followers.length && <EmptyFollowers username={username} />}
    </div>
  );
};

Followers.propTypes = {
  username: PropTypes.string.isRequired,
  setShowFFHModal: PropTypes.func.isRequired,
};

export default Followers;
