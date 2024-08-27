import express from "express";
import {
  deleteCommentById,
  getCommentReplies,
  toggleCommentLike,
} from "../controllers/comment.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/:commentId/replies", authMiddleware, getCommentReplies);

router.post("/:commentId/like", authMiddleware, toggleCommentLike);

router.delete("/:commentId", authMiddleware, deleteCommentById);

export default router;
