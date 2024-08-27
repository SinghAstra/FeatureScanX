import axios from "axios";
import { useEffect, useRef, useState } from "react";
import NotificationItem from "../components/NotificationItem";
import NotificationPageSkeleton from "../Skeleton/NotificationPageSkeleton";

const Notifications = () => {
  const [notifications, setNotifications] = useState({
    new: [],
    today: [],
    earlier: [],
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loadingNotification, setLoadingNotification] = useState(true);
  const observerRef = useRef(null);

  const isToday = (date) => {
    const today = new Date();
    const notificationDate = new Date(date);
    return (
      today.getDate() === notificationDate.getDate() &&
      today.getMonth() === notificationDate.getMonth() &&
      today.getFullYear() === notificationDate.getFullYear()
    );
  };

  const markAllNotificationAsRead = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/notifications/mark-as-read`,
        {
          withCredentials: true,
        }
      );
      console.log(
        "response.data --markAllNotificationAsRead is  ",
        response.data
      );
    } catch (error) {
      console.log(
        "error.message --markAllNotificationAsRead is ",
        error.message
      );
    }
  };

  const fetchNotifications = async (page) => {
    try {
      setLoadingNotification(true);
      const response = await axios.get(`${apiUrl}/api/notifications/`, {
        params: { page },
        withCredentials: true,
      });
      const allNotifications = response.data.notifications;

      // Group notifications into categories
      const newNotifications = allNotifications.filter(
        (notification) => !notification.isRead
      );
      const todayNotifications = allNotifications.filter(
        (notification) => isToday(notification.createdAt) && notification.isRead
      );
      const earlierNotifications = allNotifications.filter(
        (notification) =>
          !isToday(notification.createdAt) && notification.isRead
      );

      setNotifications((prevNotifications) => ({
        new: [...prevNotifications.new, ...newNotifications],
        today: [...prevNotifications.today, ...todayNotifications],
        earlier: [...prevNotifications.earlier, ...earlierNotifications],
      }));

      if (page >= response.data.totalPages) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      console.log("response.data --fetchNotifications is  ", response.data);
    } catch (error) {
      console.log("error.message --fetchNotifications is ", error.message);
    } finally {
      setLoadingNotification(false);
    }
  };

  useEffect(() => {
    fetchNotifications(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    markAllNotificationAsRead();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, loadingNotification]);

  if (loadingNotification && page === 1) {
    return <NotificationPageSkeleton />;
  }

  return (
    <div className="notification-section-container">
      {notifications.new.length > 0 && (
        <div className="notification-section">
          <h3>New</h3>
          {notifications.new.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
            />
          ))}
        </div>
      )}

      {notifications.today.length > 0 && (
        <div className="notification-section">
          <h3>Today</h3>
          {notifications.today.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
            />
          ))}
        </div>
      )}

      {notifications.earlier.length > 0 && (
        <div className="notification-section">
          <h3>Earlier</h3>
          {notifications.earlier.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
            />
          ))}
        </div>
      )}

      <div ref={observerRef} className="loading-more-notifications">
        {loadingNotification && (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
