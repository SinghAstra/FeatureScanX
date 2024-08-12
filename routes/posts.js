import express from "express";
import upload from "../config/multer.js";
import {
  createPostController,
  deleteAllPosts,
  getAllPosts,
  getFeedPosts,
  getUserPosts,
  likePost,
  newPost,
} from "../controllers/posts.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// route to create a post when the user is authenticated
router.post(
  "/create-post",
  authMiddleware,
  upload.array("media"),
  createPostController
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
router.get("/:userId", authMiddleware, getUserPosts);

// toggle like for a post
router.post("/:postId/like", authMiddleware, likePost);

//

export default router;
