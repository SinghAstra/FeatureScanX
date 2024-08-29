import express from "express";
import {
  getAllUser,
  getAllUsers,
  getFollowers,
  getFollowing,
  getRandomUsers,
  getUserPosts,
  getUserProfile,
  toggleFollow,
} from "../controllers/users.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, getAllUsers);

router.get("/get-all-users", getAllUser);

router.get("/random-users", authMiddleware, getRandomUsers);

// Fetch User Profile Information using username
router.get("/:username", authMiddleware, getUserProfile);

// Route to fetch user posts
router.get("/:username/posts", authMiddleware, getUserPosts);

// toggleFollowing a user
router.get("/:username/toggle-follow", authMiddleware, toggleFollow);

// get followers of a user
router.get("/:username/followers", authMiddleware, getFollowers);

// get following of a user
router.get("/:username/following", authMiddleware, getFollowing);

export default router;
