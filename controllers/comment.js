import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    // Input validation
    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Comment text is required." });
    }

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create the comment
    const newComment = new Comment({
      user: userId,
      post: postId,
      text: text.trim(),
    });

    // Save the comment
    await newComment.save();

    // Notify the owner of the post
    res
      .status(201)
      .json({ message: "Comment added successfully.", comment: newComment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add comment.", error: error.message });
  }
};

export const getCommentsByPostId = async (req, res) => {};
