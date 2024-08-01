import express from "express";
import {
  deleteAllUsers,
  getAllUsers,
  getFollowers,
  getFollowing,
  getUserInfo,
  toggleFollow,
} from "../controllers/users.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// get all users when you are logged in
router.get("/", authMiddleware, getAllUsers);

//delete all users
router.get("/delete-all-users", deleteAllUsers);

// get user info of any user when you are logged in
router.get("/:id", authMiddleware, getUserInfo);

// toggleFollowing a user
router.post("/follow/:userId", authMiddleware, toggleFollow);

// get followers of a user
router.get("/:id/followers", authMiddleware, getFollowers);

// get following of a user
router.get("/:id/following", authMiddleware, getFollowing);

export default router;
