import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserItem = ({ user }) => {
  return (
    <Link to={`/${user.userName}`} className="search-user-item">
      {user.profilePicture ? (
        <img src={user.profilePicture} alt={user.userName} className="avatar" />
      ) : (
        <span className="avatar">{user.fullName[0]}</span>
      )}
      <div className="user-info">
        <span className="username">{user.userName}</span>
        <span className="user-fullName">{user.fullName}</span>
      </div>
    </Link>
  );
};

UserItem.propTypes = {
  user: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    profilePicture: PropTypes.string,
  }).isRequired,
};

export default UserItem;
