import express from "express";
import { toggleSavePost } from "../controllers/savePosts.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/:postId/toggle", authMiddleware, toggleSavePost);

export default router;
