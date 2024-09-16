import Notification from "../models/Notification.js";

export const getUserNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    // Fetch all notifications for the user
    const allNotifications = await Notification.find({
      recipient: req.user.id,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "postId",
        select: "media slug",
      })
      .populate("sender", "userName fullName profilePicture");

    // Group notifications
    const newNotifications = allNotifications.filter((n) => !n.isRead);
    const todayNotifications = allNotifications.filter(
      (n) =>
        new Date(n.createdAt).toDateString() === new Date().toDateString() &&
        n.isRead
    );
    const earlierNotifications = allNotifications.filter(
      (n) =>
        new Date(n.createdAt).toDateString() !== new Date().toDateString() &&
        n.isRead
    );

    const combinedNotifications = [
      ...newNotifications,
      ...todayNotifications,
      ...earlierNotifications,
    ];

    const paginatedNotifications = combinedNotifications.slice(
      skip,
      skip + limit
    );

    const totalNotifications = combinedNotifications.length;

    res.json({
      notifications: paginatedNotifications,
      currentPage: page,
      totalPages: Math.ceil(totalNotifications / limit),
      totalNotifications,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, controller: "getUserNotifications" });
  }
};

export const markNotificationsAsRead = async (req, res) => {
  try {
    const userId = req.user.id;

    await Notification.updateMany(
      { recipient: userId, isRead: false },
      { $set: { isRead: true } }
    );

    res.json({ message: "Notifications marked as read" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, controller: markNotificationsAsRead });
  }
};

export const getUnreadNotificationsCount = async (req, res) => {
  try {
    const unreadCount = await Notification.countDocuments({
      recipient: req.user.id,
      isRead: false,
    });
    res.json({ unreadCount });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      controller: getUnreadNotificationsCount,
    });
  }
};
