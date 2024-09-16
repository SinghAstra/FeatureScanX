import PropTypes from "prop-types";

const UserItem = ({ showFollowButton = true }) => {
  return (
    <div className="user-item-skeleton">
      <div className="user-avatar-skeleton skeleton"></div>
      <div className="user-info-skeleton">
        <span className="username-skeleton skeleton"></span>
        <span className="user-fullName-skeleton skeleton"></span>
      </div>
      {showFollowButton && (
        <div className="user-follow-button-skeleton skeleton"></div>
      )}
    </div>
  );
};

UserItem.propTypes = {
  showFollowButton: PropTypes.bool,
};

export default UserItem;
