import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../styles/NotificationItem.css";

const Notification = ({ notification }) => {
  const formatTimeAgo = (commentDate) => {
    const now = new Date();
    const timeDifference = (now - new Date(commentDate)) / 1000;

    if (timeDifference < 1) {
      return "Now";
    } else if (timeDifference < 60) {
      return `${Math.floor(timeDifference)} s`; // seconds
    } else if (timeDifference < 3600) {
      return `${Math.floor(timeDifference / 60)} m`; // minutes
    } else if (timeDifference < 86400) {
      return `${Math.floor(timeDifference / 3600)} h`; // hours
    } else if (timeDifference < 604800) {
      return `${Math.floor(timeDifference / 86400)} d`; // days
    } else {
      return `${Math.floor(timeDifference / 604800)} w`; // weeks
    }
  };

  return (
    <div className="notification">
      <Link
        to={`/${notification.sender.userName}`}
        className="notification-user-avatar"
      >
        {notification.sender.profilePicture ? (
          <img
            src={notification.sender.profilePicture}
            alt={notification.sender.userName}
            className="avatar"
          />
        ) : (
          <span className="avatar">{notification.sender.fullName[0]}</span>
        )}
      </Link>
      <div className="notification-text">
        {notification.type === "like" && (
          <p>
            <Link to={`/${notification.sender.userName}`}>
              <strong>{notification.sender.userName}</strong>
            </Link>{" "}
            <Link
              to={
                notification.postId
                  ? `/posts/${notification.postId.slug}`
                  : `/${notification.sender.userName}`
              }
            >
              liked your post.
            </Link>
          </p>
        )}
        {notification.type === "comment" && (
          <p>
            <Link to={`/${notification.sender.userName}`}>
              <strong>{notification.sender.userName}</strong>
            </Link>{" "}
            <Link
              to={
                notification.postId
                  ? `/posts/${notification.postId.slug}`
                  : `/${notification.sender.userName}`
              }
            >
              commented: {notification.commentText}
            </Link>
          </p>
        )}
        {notification.type === "follow" && (
          <p>
            <Link to={`/${notification.sender.userName}`}>
              <strong>{notification.sender.userName}</strong>
            </Link>{" "}
            <Link
              to={
                notification.postId
                  ? `/posts/${notification.postId.slug}`
                  : `/${notification.sender.userName}`
              }
            >
              started following you
            </Link>
          </p>
        )}
      </div>
      {notification.postId && (
        <Link to={`/posts/${notification.postId.slug}`}>
          <img
            src={notification.postId.media[0].lowResUrl}
            alt="Post preview"
          />
        </Link>
      )}
      <Link
        className="time-ago"
        to={
          notification.postId
            ? `/posts/${notification.postId.slug}`
            : `/${notification.sender.userName}`
        }
      >
        {formatTimeAgo(notification.createdAt)}
      </Link>
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.shape({
    type: PropTypes.oneOf(["like", "comment", "follow"]).isRequired,
    sender: PropTypes.shape({
      userName: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      profilePicture: PropTypes.string,
    }).isRequired,
    commentText: PropTypes.string,
    postId: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      media: PropTypes.arrayOf(
        PropTypes.shape({
          lowResUrl: PropTypes.string.isRequired,
        })
      ),
    }),
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Notification;
