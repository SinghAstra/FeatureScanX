import express from "express";
import {
  addCommentToPost,
  getAllCommentsOfPost,
} from "../controllers/comment.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/:postId", authMiddleware, addCommentToPost);

// get all comments of particular post
router.get("/:postId", authMiddleware, getAllCommentsOfPost);

export default router;
