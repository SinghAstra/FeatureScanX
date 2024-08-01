import express from "express";
import upload from "../config/multer.js";
import {
  fetchUserInfoUsingJWTTokenInCookies,
  loginUser,
  registerUser,
} from "../controllers/auth.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/register", upload.single("picture"), registerUser);
router.post("/login", loginUser);
router.post("/user", authMiddleware, fetchUserInfoUsingJWTTokenInCookies);

export default router;
