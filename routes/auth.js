import axios from "axios";
import dotenv from "dotenv";
import express from "express";
import upload from "../config/multer.js";
import {
  checkUserExists,
  fetchUserInfoUsingForgotPasswordJWTToken,
  fetchUserInfoUsingJWTTokenInCookies,
  forgetPassword,
  githubAuth,
  googleAuth,
  loginUser,
  registerUserController,
  resetPassword,
} from "../controllers/auth.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

dotenv.config();

// Check if username and email is available
router.post("/check-user-exists", checkUserExists);
router.post("/register", registerUserController);
router.post("/login", loginUser);
router.post("/me", authMiddleware, fetchUserInfoUsingJWTTokenInCookies);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:token", resetPassword);

router.get(
  "/user-info-using-forget-password-token/:token",
  fetchUserInfoUsingForgotPasswordJWTToken
);
router.get("/google", googleAuth);
router.get("/github", githubAuth);

export default router;
