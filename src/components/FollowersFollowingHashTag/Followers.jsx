import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import FollowersFollowingSkeleton from "../../Loaders/FollowersFollowingSkeleton";
import EmptyFollowers from "../../placeholders/FollowersFollowingHashtag/EmptyFollowers";
import "../../styles/Followers.css";
import UserItem from "./UserItem";

const Followers = ({ username, setShowFFHModal }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loadingFollowers, setLoadingFollowers] = useState(true);
  const [followers, setFollowers] = useState([]);

  const fetchFollowers = async () => {
    try {
      setLoadingFollowers(true);
      const response = await axios.get(
        `${apiUrl}/api/users/${username}/followers`,
        { withCredentials: true }
      );
      console.log("response.data --fetchFollowers is ", response.data);
      setFollowers(response.data.followers);
    } catch (error) {
      console.log("error --fetchFollowers is ", error);
      setFollowers([]);
    } finally {
      setLoadingFollowers(false);
    }
  };

  useEffect(() => {
    fetchFollowers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  if (loadingFollowers) {
    return <FollowersFollowingSkeleton />;
  }

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
