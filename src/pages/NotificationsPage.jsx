import axios from "axios";
import { useEffect, useState } from "react";
import Notification from "../components/Notification";
import "../styles/NotificationsPage.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState({
    new: [],
    today: [],
    earlier: [],
  });
  const apiUrl = import.meta.env.VITE_API_URL;

  const isToday = (date) => {
    const today = new Date();
    const notificationDate = new Date(date);
    return (
      today.getDate() === notificationDate.getDate() &&
      today.getMonth() === notificationDate.getMonth() &&
      today.getFullYear() === notificationDate.getFullYear()
    );
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/notifications/`, {
          withCredentials: true,
        });
        const allNotifications = response.data.notifications;

        // Group notifications into categories
        const newNotifications = allNotifications.filter(
          (notification) => !notification.isRead
        );
        const todayNotifications = allNotifications.filter((notification) =>
          isToday(notification.createdAt)
        );
        const earlierNotifications = allNotifications.filter(
          (notification) =>
            !isToday(notification.createdAt) && notification.isRead
        );

        setNotifications({
          new: newNotifications,
          today: todayNotifications,
          earlier: earlierNotifications,
        });
        console.log("response.data --fetchNotifications is  ", response.data);

        const res = await axios.get(
          `${apiUrl}/api/notifications/mark-as-read`,
          {
            withCredentials: true,
          }
        );
        console.log("res.data notifications mark as read is ", res.data);
      } catch (error) {
        console.log("error.message --fetchNotifications is ", error.message);
      }
    };

    fetchNotifications();
  }, [apiUrl]);

  return (
    <div className="notification-container">
      {notifications.new.length > 0 && (
        <div className="notification-section">
          <h3>New</h3>
          {notifications.new.map((notification) => (
            <Notification key={notification._id} notification={notification} />
          ))}
        </div>
      )}

      {notifications.today.length > 0 && (
        <div className="notification-section">
          <h3>Today</h3>
          {notifications.today.map((notification) => (
            <Notification key={notification._id} notification={notification} />
          ))}
        </div>
      )}

      {notifications.earlier.length > 0 && (
        <div className="notification-section">
          <h3>Earlier</h3>
          {notifications.earlier.map((notification) => (
            <Notification key={notification._id} notification={notification} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
