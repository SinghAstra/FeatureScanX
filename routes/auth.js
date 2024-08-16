import express from "express";
import upload from "../config/multer.js";
import {
  checkAvailabilityController,
  deleteAllUser,
  fetchUserInfoUsingJWTTokenInCookies,
  loginUser,
  registerUserController,
  verifyEmailController,
} from "../controllers/auth.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/check-availability", checkAvailabilityController);
router.post("/verify-email", verifyEmailController);
// router.post("/verify-phone-number", verifyPhoneNumberController);
router.post("/register", registerUserController);
router.post("/login", loginUser);
router.post("/me", authMiddleware, fetchUserInfoUsingJWTTokenInCookies);

// Testing Purposes
router.get("/delete-all-user", deleteAllUser);

export default router;
