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

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, controller: getAllComments });
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

export const toggleCommentLike = async (req, res) => {
  const userId = req.user.id;
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Toggle like status
    if (comment.likes.includes(userId)) {
      // User has already liked the comment, so unlike it
      comment.likes = comment.likes.filter((id) => !id.equals(userId));
    } else {
      // User has not liked the comment, so like it
      comment.likes.push(userId);
    }

    await comment.save();

    res.status(200).json({ likesCount: comment.likes.length });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, controller: toggleCommentLikePost });
  }
};

export const replyComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;
    const { replyText } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (replyText.trim() === "") {
      return res.status(400).json({ message: "Reply text is required" });
    }

    comment.replies.push({ userId, replyText });
    await comment.save();

    res.status(201).json({ replies: comment.replies });
  } catch (error) {
    res.status(500).json({ message: error.message, error: replyComment });
  }
};
