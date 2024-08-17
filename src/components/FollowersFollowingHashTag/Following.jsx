import axios from "axios";
import propTypes from "prop-types";
import { useEffect, useState } from "react";
import UserItem from "./UserItem";

const Following = ({ username, setShowFFHModal }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [following, setFollowing] = useState([]);

  const fetchFollowing = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/users/${username}/following`,
        { withCredentials: true }
      );
      console.log(
        "response.data.following --fetchFollowing is ",
        response.data.following
      );
      setFollowing(response.data.following);
    } catch (error) {
      console.log("error.message --fetchFollowing is ", error.message);
      setFollowing([]);
    }
  };

  useEffect(() => {
    fetchFollowing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);
  return (
    <div className="following-container">
      {following.map((user) => (
        <UserItem
          key={user._id}
          user={user}
          setShowFFHModal={setShowFFHModal}
        />
      ))}
      {!following.length && <p>No Following.</p>}
    </div>
  );
};

Following.propTypes = {
  username: propTypes.string.isRequired,
};

export default Following;
