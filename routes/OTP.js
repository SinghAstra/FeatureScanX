import express from "express";
import { sendEmailController, verifyOTP } from "../controllers/OTP.js";
const router = express.Router();

router.get("/send-email", sendEmailController);

router.post("/verify", verifyOTP);

export default router;
