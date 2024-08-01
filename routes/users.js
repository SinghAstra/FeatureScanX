import express from "express";
import { addRemoveFriend, getUserInfo } from "../controllers/users.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", authMiddleware, getUserInfo);

router.patch("/friend/:friendId", authMiddleware, addRemoveFriend);

export default router;
