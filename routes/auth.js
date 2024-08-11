import express from "express";
import upload from "../config/multer.js";
import {
  checkAvailabilityController,
  deleteAllUser,
  fetchUserInfoUsingJWTTokenInCookies,
  loginUser,
  registerUserController,
  sendConfirmationCodeController,
} from "../controllers/auth.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/check-availability", checkAvailabilityController);
router.post("/send-confirmation-code", sendConfirmationCodeController);
router.post("/register", registerUserController);
router.post("/login", loginUser);
router.post("/user", authMiddleware, fetchUserInfoUsingJWTTokenInCookies);
router.get("/delete-all-user", deleteAllUser);

export default router;
