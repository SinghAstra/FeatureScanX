import "../../styles/NotificationsSkeleton.css";

const NewNotification = () => {
  return (
    <div className="empty-notification">
      <img src="/alert.png" alt="notification" />
      <p>You have no new notifications.</p>
    </div>
  );
};

export default NewNotification;
