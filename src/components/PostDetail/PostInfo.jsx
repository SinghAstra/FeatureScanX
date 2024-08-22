import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/PostInfo.css";
import PostCaption from "./PostCaption";
import PostComment from "./PostComment";

const PostInfo = ({ post, isPostLikedByCurrentUser }) => {
  const [isPostLiked, setIsPostLiked] = useState(isPostLikedByCurrentUser);
  const [postLikesCount, setPostLikesCount] = useState(post.likes.length);
  const [postBookmark, setPostBookmark] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLikePost = async () => {
    try {
      // Handle the UI Optimistically
      setIsPostLiked(!isPostLiked);
      const response = await axios.get(`${apiUrl}/api/posts/${post._id}/like`, {
        withCredentials: true,
      });
      console.log("response.data -- handleLikePost is ", response.data);
      setPostLikesCount(response.data.likes);
    } catch (error) {
      // if error comes in updating the backend, revert back to the original state
      setIsPostLiked(!isPostLiked);
      console.log("error.message --handleLikePost is :", error.message);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (comment.trim() === "") return;

    try {
      const response = await axios.post(
        `${apiUrl}/api/posts/${post._id}/comments`,
        {
          commentText: comment,
        },
        { withCredentials: true }
      );
      setComments([response.data.comment, ...comments]);
      setComment("");
      console.log("response.data --handleCommentSubmit is ", response.data);
    } catch (error) {
      console.log("Error submitting comment:", error);
    }
  };

  const formatDate = (createdAt) => {
    const postDate = new Date(createdAt);
    const now = new Date();
    const timeDiff = now - postDate; // time difference in milliseconds

    const secondsDiff = Math.floor(timeDiff / 1000); // convert to seconds
    const minutesDiff = Math.floor(timeDiff / (1000 * 60)); // convert to minutes
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60)); // convert to hours
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // convert to days

    // If less than 1 minute ago, show seconds ago
    if (secondsDiff < 60) {
      return `${secondsDiff} second${secondsDiff === 1 ? "" : "s"} ago`;
    }

    // If less than 1 hour ago, show minutes ago
    if (minutesDiff < 60) {
      return `${minutesDiff} minute${minutesDiff === 1 ? "" : "s"} ago`;
    }

    // If less than 1 day ago, show hours ago
    if (hoursDiff < 24) {
      return `${hoursDiff} hour${hoursDiff === 1 ? "" : "s"} ago`;
    }

    // If within the last 7 days, show days ago
    if (daysDiff <= 7) {
      return `${daysDiff} day${daysDiff === 1 ? "" : "s"} ago`;
    }

    // If the post is more than 7 days ago, display the full date
    const postYear = postDate.getFullYear();
    const currentYear = now.getFullYear();

    const options = { day: "numeric", month: "long" }; // e.g., "10 August"
    const formattedDate = postDate.toLocaleDateString(undefined, options);

    // Show full date with year if it's from a previous year
    if (postYear === currentYear) {
      return formattedDate; // e.g., "10 August"
    } else {
      return `${formattedDate} ${postYear}`; // e.g., "1 July 2023"
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoadingComments(true);
        const response = await axios.get(
          `${apiUrl}/api/posts/${post._id}/comments`,
          {
            withCredentials: true,
          }
        );
        setComments(response.data);
        console.log("response.data --fetchComments is ", response.data);
      } catch (error) {
        console.log("error.message --fetchComments is :", error.message);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [apiUrl, post._id]);

  return (
    <div className="post-info-container">
      <div className="post-author-profile">
        <Link to={`/${post.userId.userName}`} className="post-author-nav">
          {post.userId.profilePicture ? (
            <img
              src={post.userId.profilePicture}
              alt={post.userId.userName}
              className="post-author-avatar"
            />
          ) : (
            <span className="post-author-avatar">
              {post.userId.fullName[0]}
            </span>
          )}
          <span className="post-author-username">{post.userId.userName}</span>
        </Link>
        <i className="uil uil-ellipsis-h"></i>
      </div>
      <div className="post-comments-container">
        <PostCaption post={post} />
        {loadingComments ? (
          <p>Loading...</p>
        ) : (
          comments.map((comment) => (
            <PostComment key={comment._id} comment={comment} />
          ))
        )}
      </div>
      <div className="post-actions">
        <div className="post-action-icons">
          <div className="post-interactions-icon">
            <button className="post-like-btn" onClick={handleLikePost}>
              {isPostLiked ? (
                <i className="fa-solid fa-heart filled-heart"></i>
              ) : (
                <i className="fa-regular fa-heart"></i>
              )}
            </button>
            <button className="post-comment-btn">
              <i className="fa-regular fa-comment"></i>
            </button>
            <button className="post-share-btn">
              <i className="fa-regular fa-paper-plane"></i>
            </button>
          </div>
          <button
            className="post-bookmark-btn"
            onClick={() => setPostBookmark(!postBookmark)}
          >
            {postBookmark ? (
              <i className="fa-solid fa-bookmark"></i>
            ) : (
              <i className="fa-regular fa-bookmark"></i>
            )}
          </button>
        </div>
        <div className="post-likes-count">
          {postLikesCount === 0
            ? "Be the first to like this."
            : `${postLikesCount} likes`}
        </div>
        <div className="post-createdAt"> {formatDate(post.createdAt)}</div>
      </div>
      <div className="add-comment-container">
        <input
          type="text"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          className="add-comment-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleCommentSubmit();
            }
          }}
        />
        <button
          className={`add-comment-btn ${
            comment.trim() === "" ? "disabled" : ""
          }`}
          onClick={handleCommentSubmit}
        >
          Post
        </button>
      </div>
    </div>
  );
};

PostInfo.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    userId: PropTypes.shape({
      userName: PropTypes.string.isRequired,
      profilePicture: PropTypes.string,
      fullName: PropTypes.string.isRequired,
    }).isRequired,
    caption: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(
      PropTypes.shape({
        userId: PropTypes.string.isRequired,
      })
    ).isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  isPostLikedByCurrentUser: PropTypes.bool.isRequired,
};

export default PostInfo;
