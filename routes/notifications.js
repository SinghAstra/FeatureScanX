import express from "express";
import {
  getUnreadNotificationsCount,
  getUserNotifications,
  markNotificationsAsRead,
} from "../controllers/notifications.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, getUserNotifications);
router.get("/unread-count", authMiddleware, getUnreadNotificationsCount);

router.get("/mark-as-read", authMiddleware, markNotificationsAsRead);

export default router;
