import PropTypes from "prop-types";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const EmptyFollowing = ({ username }) => {
  const { currentUser } = useContext(AuthContext);
  const isCurrentUser = currentUser.userName === username;

  return (
    <div className="empty-following">
      <div className="icon">
        <img src="/boy.png" alt="following" />
      </div>
      {isCurrentUser ? (
        <p>You&#039;ll see everyone you follow here.</p>
      ) : (
        <p>This account follows no one.</p>
      )}
    </div>
  );
};

EmptyFollowing.propTypes = {
  username: PropTypes.string.isRequired,
};

export default EmptyFollowing;
