import express from "express";
import {
  deleteAllUsers,
  getAllUsers,
  getFollowers,
  getFollowing,
  getUserPosts,
  getUserProfile,
  toggleFollow,
} from "../controllers/users.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Testing Purposes
router.get("/get-all-users", getAllUsers);
router.get("/delete-all-users", deleteAllUsers);

// Fetch User Profile Information using username
router.get("/:username", authMiddleware, getUserProfile);

// Route to fetch user posts
router.get("/:username/posts", authMiddleware, getUserPosts);

// toggleFollowing a user
router.get("/:userId/toggle-follow", authMiddleware, toggleFollow);

// get followers of a user
router.get("/:userId/followers", authMiddleware, getFollowers);

// get following of a user
router.get("/:userId/following", authMiddleware, getFollowing);

export default router;
