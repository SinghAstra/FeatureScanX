import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const addCommentToPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { commentText, parentId } = req.body;
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
      parentId: parentId || null,
    });

    // Save the comment
    await newComment.save();

    // update the post only if the comment is top level comment
    if (!parentId) {
      post.comments.push(newComment._id);
      await post.save();
    }

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
    res
      .status(500)
      .json({ message: error.message, controller: addCommentToPost });
  }
};

// Fetch paginated comments for a specific post
export const getCommentsOnPost = async (req, res) => {
  const { postId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    // Fetch the total count of comments
    const totalComments = await Comment.countDocuments({
      postId: postId,
      parentId: null, // Top-level comments
    });

    // Apply pagination to get comments for the current page
    const topLevelComments = await Comment.find({
      postId: postId,
      parentId: null,
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("userId", "userName fullName profilePicture");

    const commentsWithReplyCount = await Promise.all(
      topLevelComments.map(async (comment) => {
        const replyCount = await Comment.countDocuments({
          parentId: comment._id,
        });
        return {
          ...comment.toObject(),
          replyCount,
        };
      })
    );

    res.status(200).json({
      comments: commentsWithReplyCount,
      totalComments,
      currentPage: page,
      totalPages: Math.ceil(totalComments / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
