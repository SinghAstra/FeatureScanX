import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/Auth";
import "../../styles/UserItem.css";

const UserItem = ({ user, setShowFFHModal }) => {
  const { user: currentUser } = useContext(AuthContext);

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
      {currentUser.userName !== user.userName &&
        (currentUser.following.includes(user._id) ? (
          <button className="following-button">Following</button>
        ) : (
          <button className="follow-button">Follow</button>
        ))}
    </div>
  );
};

export default UserItem;
