import express from "express";
import {
  deleteAllComments,
  getAllComments,
  replyComment,
  toggleCommentLike,
} from "../controllers/comment.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Testing Routes
router.get("/get-all-comments", getAllComments);
router.get("/delete-all-comments", deleteAllComments);

router.post("/:commentId/like", authMiddleware, toggleCommentLike);
router.post("/:commentId/reply", authMiddleware, replyComment);

export default router;
