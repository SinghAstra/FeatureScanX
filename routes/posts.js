import express from "express";
import upload from "../config/multer.js";
import { createPost } from "../controllers/posts.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// create a post when the user is authenticated
router.post(
  "/create-post",
  authMiddleware,
  upload.single("picture"),
  createPost
);

// get the posts for home page
// router.get("/", verifyToken, getFeedPosts);

// get all post of a certain user
// router.get("/:userId/posts", verifyToken, getUserPosts);

// toggle like for a post
// router.patch("/:postId/like", verifyToken, likePost);

export default router;
