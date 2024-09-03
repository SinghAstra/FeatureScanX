import express from "express";
import upload from "../config/multer.js";
import {
  checkAvailabilityController,
  fetchUserInfoUsingJWTTokenInCookies,
  loginUser,
  registerUserController,
  verifyEmailController,
} from "../controllers/auth.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Authentication and registration routes

// Check if username and email is available
router.post("/check-availability", checkAvailabilityController);
router.post("/register", registerUserController);
router.post("/login", loginUser);
router.post("/me", authMiddleware, fetchUserInfoUsingJWTTokenInCookies);

// Email Verification
router.post("/verify-email", verifyEmailController);
// Phone Verification

export default router;
