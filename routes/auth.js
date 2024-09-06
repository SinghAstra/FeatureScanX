import express from "express";
import upload from "../config/multer.js";
import {
  checkUserExists,
  fetchUserInfoUsingJWTTokenInCookies,
  forgetPassword,
  loginUser,
  registerUserController,
  resetPassword,
} from "../controllers/auth.js";
import authMiddleware from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// Authentication and registration routes

// Check if username and email is available
router.post("/check-user-exists", checkUserExists);
router.post("/register", registerUserController);
router.post("/login", loginUser);
router.post("/me", authMiddleware, fetchUserInfoUsingJWTTokenInCookies);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/delete-user", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      email: "abhaypratapsinghwd@gmail.com",
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
