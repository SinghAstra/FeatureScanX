const Notification = ({ notification }) => {
  return (
    <div className="notification">
      {notification.type === "like" && (
        <p>{notification.sender.userName} liked your post</p>
      )}
      {notification.type === "comment" && (
        <p>{notification.sender.userName} commented on your post</p>
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

export default Notification;
