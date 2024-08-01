import express from "express";
import {
  fetchUserInfoUsingJWTTokenInCookies,
  loginUser,
} from "../controllers/auth.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/user", authMiddleware, fetchUserInfoUsingJWTTokenInCookies);

export default router;
