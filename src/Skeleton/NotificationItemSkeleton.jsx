const NotificationItemSkeleton = () => {
  return (
    <div className="notification-item-skeleton">
      <div className="user-avatar-skeleton skeleton"></div>
      <div className="notification-info">
        <span className="username-skeleton skeleton"></span>
        <span className="user-fullName-skeleton skeleton"></span>
      </div>
      <div className="notification-post-image-skeleton skeleton"></div>
    </div>
  );
};

export default NotificationItemSkeleton;
