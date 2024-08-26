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

router.post("/check-availability", checkAvailabilityController);
router.post("/verify-email", verifyEmailController);
router.post("/register", registerUserController);
router.post("/login", loginUser);
router.post("/me", authMiddleware, fetchUserInfoUsingJWTTokenInCookies);

// Testing Purposes

export default router;

// Future :
// Verification of Phone Number
