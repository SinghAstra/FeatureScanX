import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const addCommentToPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { commentText } = req.body;
    const userId = req.user.id;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Create a new comment object
    const newComment = new Comment({
      postId,
      userId,
      commentText,
    });

    // Save the comment
    await newComment.save();

    // Update the post's comments array
    post.comments.push(newComment._id);
    await post.save();

    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ message: "Server error - addCommentToPost" });
  }
};

export const getAllCommentsOfPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comments = await Comment.find({ postId })
      .populate("userId", "userName fullName profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error --getAllCommentsOfPost" });
  }
};
