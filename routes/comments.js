import express from "express";
import { toggleCommentLike } from "../controllers/comment.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/:commentId/like", authMiddleware, toggleCommentLike);

export default router;
