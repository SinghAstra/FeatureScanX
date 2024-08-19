import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import FollowersFollowingSkeleton from "../../Loaders/FollowersFollowingSkeleton";
import EmptyFollowing from "../../placeholders/FollowersFollowingHashtag/EmptyFollowing";
import UserItem from "./UserItem";

const Following = ({ username, setShowFFHModal }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loadingFollowing, setLoadingFollowing] = useState(true);
  const [following, setFollowing] = useState([]);

  const fetchFollowing = async () => {
    try {
      setLoadingFollowing(true);
      const response = await axios.get(
        `${apiUrl}/api/users/${username}/following`,
        { withCredentials: true }
      );
      console.log("response.data --fetchFollowing is ", response.data);
      setFollowing(response.data.following);
    } catch (error) {
      console.log("error --fetchFollowing is ", error);
      setFollowing([]);
    } finally {
      setLoadingFollowing(false);
    }
  };

  useEffect(() => {
    fetchFollowing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  if (loadingFollowing) {
    return <FollowersFollowingSkeleton />;
  }

  return (
    <div className="following-container">
      {following.map((user) => (
        <UserItem
          key={user._id}
          user={user}
          setShowFFHModal={setShowFFHModal}
        />
      ))}
      {!following.length && <EmptyFollowing username={username} />}
    </div>
  );
};

Following.propTypes = {
  username: PropTypes.string.isRequired,
  setShowFFHModal: PropTypes.func.isRequired,
};

export default Following;
