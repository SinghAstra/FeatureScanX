import express from "express";
import upload from "../config/multer.js";
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

export default router;
