import express from "express";
import {
  addRemoveFriend,
  getAllUsers,
  getUserInfo,
} from "../controllers/users.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// get all users when you are logged in
router.get("/", authMiddleware, getAllUsers);

// get user info of any user when you are logged in
router.get("/:id", authMiddleware, getUserInfo);

// add or remove friend when you are logged in
router.patch("/friend/:friendId", authMiddleware, addRemoveFriend);

export default router;
