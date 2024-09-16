import express from "express";
import { getChatMessages, sendMessage } from "../controllers/messages.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/:chatId", authMiddleware, getChatMessages);
router.post("/", authMiddleware, sendMessage);

export default router;
