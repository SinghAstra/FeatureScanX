import express from "express";
import upload from "../config/multer.js";
import {
  createPost,
  deleteAllPosts,
  getAllPosts,
  getFeedPosts,
  newPost,
} from "../controllers/posts.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// create a post when the user is authenticated
router.post(
  "/create-post",
  authMiddleware,
  upload.single("picture"),
  createPost
);

// route to create a new post without using multer
router.post("/new-post", newPost);

// get the posts for home page
router.get("/", authMiddleware, getFeedPosts);

// get all the posts
router.get("/all", authMiddleware, getAllPosts);

// delete all the posts
router.get("/delete-all", authMiddleware, deleteAllPosts);

// get all post of a certain user
// router.get("/:userId/posts", verifyToken, getUserPosts);

// toggle like for a post
// router.patch("/:postId/like", verifyToken, likePost);

export default router;
