import express from "express";
import {
  getAllUsers,
  getUserInfo,
  toggleFollow,
} from "../controllers/users.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// get all users when you are logged in
router.get("/", authMiddleware, getAllUsers);

// get user info of any user when you are logged in
router.get("/:id", authMiddleware, getUserInfo);

// toggleFollowing a user
router.get("/follow/:userId", authMiddleware, toggleFollow);

export default router;
