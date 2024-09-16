import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const UserItem = ({ user, setShowFFHModal }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(
    currentUser.following.includes(user._id)
  );
  const apiUrl = import.meta.env.VITE_API_URL;
  const isCurrentUser = currentUser.userName === user.userName;

  const handleToggleFollow = async () => {
    try {
      // update the ui optimistically
      setIsFollowing((prev) => !prev);
      const response = await axios.get(
        `${apiUrl}/api/users/${user.userName}/toggle-follow`,
        {
          withCredentials: true,
        }
      );

      setCurrentUser({
        ...currentUser,
        following: response.data.updatedFollowing,
      });

      console.log("response.data --handleToggleFollow is ", response.data);
    } catch (error) {
      // in case of error revert to original state
      setIsFollowing((prev) => !prev);
      console.log("error.message --handleToggleFollow is ", error.message);
    }
  };

  return (
    <div key={user._id} className="user-item">
      <Link
        className="user-item-nav"
        to={`/${user.userName}`}
        onClick={() => setShowFFHModal(false)}
      >
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={user.userName}
            className="avatar"
          />
        ) : (
          <span className="avatar">{user.fullName[0]}</span>
        )}
        <div className="user-info">
          <span className="username">{user.userName}</span>
          <span className="user-fullName">{user.fullName}</span>
        </div>
      </Link>
      {!isCurrentUser &&
        (isFollowing ? (
          <button className="following-button" onClick={handleToggleFollow}>
            Following
          </button>
        ) : (
          <button className="follow-button" onClick={handleToggleFollow}>
            Follow
          </button>
        ))}
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    profilePicture: PropTypes.string,
  }).isRequired,
  setShowFFHModal: PropTypes.func.isRequired,
};

export default UserItem;
