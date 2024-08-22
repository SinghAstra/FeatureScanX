import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

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

    const user = await User.findById(userId).select(
      "userName profilePicture fullName"
    );

    const commentWithUserDetails = {
      ...newComment.toObject(),
      userId: {
        userName: user.userName,
        profilePicture: user.profilePicture,
        fullName: user.fullName,
      },
    };

    res.status(201).json({
      message: "Comment added successfully",
      comment: commentWithUserDetails,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error - addCommentToPost" });
  }
};

export const getCommentsOnPost = async (req, res) => {
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

export const deleteAllComments = async (req, res) => {
  try {
    const comments = await Comment.deleteMany({});
    res.json({ comments, message: "Deleted All Comments Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, controller: deleteAllComments });
  }
};
