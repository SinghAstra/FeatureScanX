import express from "express";
import { accessChat, getChatList } from "../controllers/chat.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// return one to one chat if it exists otherwise create a new one to one chat
router.post("/@:username", authMiddleware, accessChat);

// get list of chats the user has access to
router.get("/chatList", authMiddleware, getChatList);

export default router;
