import express from "express";
import {
  deleteAllComments,
  deleteAllNonRootComments,
  getAllComments,
  toggleCommentLike,
} from "../controllers/comment.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Testing Routes
router.get("/get-all-comments", getAllComments);
router.get("/delete-all-comments", deleteAllComments);
router.get("/delete-all-non-root-comments", deleteAllNonRootComments);

router.post("/:commentId/like", authMiddleware, toggleCommentLike);

export default router;
