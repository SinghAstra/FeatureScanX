import express from "express";
import { addComment } from "../controllers/comment.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Add a comment to post
router.post("/:postId", authMiddleware, addComment);

export default router;
