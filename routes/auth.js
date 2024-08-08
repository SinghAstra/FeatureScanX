import express from "express";
import upload from "../config/multer.js";
import {
  checkAvailabilityController,
  fetchUserInfoUsingJWTTokenInCookies,
  loginUser,
  registerUser,
  sendConfirmationCodeController,
} from "../controllers/auth.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/check-availability", checkAvailabilityController);
router.post("/send-confirmation-code", sendConfirmationCodeController);
router.post("/register", upload.single("picture"), registerUser);
router.post("/login", loginUser);
router.post("/user", authMiddleware, fetchUserInfoUsingJWTTokenInCookies);

export default router;
