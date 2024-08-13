import express from "express";
import {
  deleteAllUsers,
  getAllUsers,
  getFollowers,
  getFollowing,
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

// toggleFollowing a user
router.post("/follow/:userId", authMiddleware, toggleFollow);

// get followers of a user
router.get("/:id/followers", authMiddleware, getFollowers);

// get following of a user
router.get("/:id/following", authMiddleware, getFollowing);

export default router;
