import express from "express";
import { sendMessage } from "../controllers/messages.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, sendMessage);

export default router;
