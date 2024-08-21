import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/PostInfo.css";
import PostComments from "./PostComments";

const PostInfo = ({ post }) => {
  const [postLike, setPostLike] = useState(false);
  const [postBookmark, setPostBookmark] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (comment.trim() === "") return;

    try {
      const response = await axios.post(
        `${apiUrl}/api/comments/${post._id}`,
        {
          commentText: comment,
        },
        { withCredentials: true }
      );
      setComments([...comments, response.data.comment]);
      setComment("");
      console.log("response.data --handleCommentSubmit is ", response.data);
    } catch (error) {
      console.log("Error submitting comment:", error);
    }
  };

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
      <PostComments post={post} />
      <div className="post-actions">
        <div className="post-action-icons">
          <div className="post-interactions-icon">
            <button
              className="post-like-btn"
              onClick={() => setPostLike(!postLike)}
            >
              {postLike ? (
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
        <div className="post-likes-count">1,234 likes</div>
        <div className="post-createdAt">10 August</div>
      </div>
      <div className="add-comment-container">
        <input
          type="text"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          className="add-comment-input"
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
  }).isRequired,
};

export default PostInfo;
