import express from "express";
import upload from "../config/multer.js";
import {
  addCommentToPost,
  deleteAllComments,
  getCommentsOnPost,
} from "../controllers/comment.js";
import { deleteAllLikes, toggleLikeOnPost } from "../controllers/likes.js";
import {
  createPostController,
  deleteAllPosts,
  getAllPosts,
  getFeedPosts,
  getPostById,
} from "../controllers/posts.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Testing Purposes
router.get("/delete-all-posts", deleteAllPosts);
router.get("/delete-all-likes", deleteAllLikes);
router.get("/delete-all-comments", deleteAllComments);
router.get("/get-all-posts", getAllPosts);

// route to create a post when the user is authenticated
router.post(
  "/create-post",
  authMiddleware,
  upload.array("media"),
  createPostController
);

// get the posts for home page
router.get("/feed", authMiddleware, getFeedPosts);

// get detailed info of particular post
router.get("/:postId", authMiddleware, getPostById);

// toggle like on a post
router.get("/:postId/like", authMiddleware, toggleLikeOnPost);

// get comments of particular post
router.get("/:postId/comments", authMiddleware, getCommentsOnPost);

// add comment on particular post
router.post("/:postId/comment", authMiddleware, addCommentToPost);

export default router;
