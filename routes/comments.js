import express from "express";
import { addCommentToPost } from "../controllers/comment.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/:postId", authMiddleware, addCommentToPost);

export default router;
