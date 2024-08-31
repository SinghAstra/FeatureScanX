import express from "express";
import { accessChat, getAllUserChats } from "../controllers/chat.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// return one to one chat if it exists otherwise create a new one to one chat
router.post("/@:username", authMiddleware, accessChat);

router.get("/get-all-user-chats", authMiddleware, getAllUserChats);

export default router;
