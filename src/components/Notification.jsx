import PropTypes from "prop-types";

const Notification = ({ notification }) => {
  return (
    <div className="notification">
      {notification.type === "like" && (
        <p>{notification.sender.userName} liked your post.</p>
      )}
      {notification.type === "comment" && (
        <p>
          {notification.sender.userName} commented: {notification.commentText}
        </p>
      )}
      {notification.type === "follow" && (
        <p>{notification.sender.userName} started following you</p>
      )}
      {notification.postId && (
        <img src={notification.postId.media[0].lowResUrl} alt="Post preview" />
      )}
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.shape({
    type: PropTypes.oneOf(["like", "comment", "follow"]).isRequired,
    sender: PropTypes.shape({
      userName: PropTypes.string.isRequired,
    }).isRequired,
    commentText: PropTypes.string,
    postId: PropTypes.shape({
      media: PropTypes.arrayOf(
        PropTypes.shape({
          lowResUrl: PropTypes.string.isRequired,
        })
      ),
    }),
  }).isRequired,
};

export default Notification;
