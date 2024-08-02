import express from "express";
import { addComment, getCommentsByPostId } from "../controllers/comment.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Add a comment to post
router.post("/:postId", authMiddleware, addComment);

// get all comments of a post
router.get("/:postId", authMiddleware, getCommentsByPostId);

export default router;
