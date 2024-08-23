import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const PostComment = ({ comment }) => {
  const { currentUser } = useContext(AuthContext);
  const [isCommentLiked, setIsCommentLiked] = useState(
    comment.likes.includes(currentUser._id)
  );
  const [commentLikesCount, setCommentLikesCount] = useState(
    comment.likes.length
  );
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleCommentLikeToggle = async () => {
    try {
      // update the ui optimistically
      setIsCommentLiked((prev) => !prev);
      const response = await axios.post(
        `${apiUrl}/api/comments/${comment._id}/like`,
        {},
        { withCredentials: true }
      );
      console.log("response.data --handleCommentLikeToggle is ", response.data);
      setCommentLikesCount(response.data.likesCount);
    } catch (error) {
      // revert back to original state if error occurs in updating the backend
      setIsCommentLiked((prev) => prev);
      console.log("error.message --handleCommentLikeToggle is ", error.message);
    }
  };

  const formatTimeAgo = (commentDate) => {
    const now = new Date();
    const timeDifference = (now - new Date(commentDate)) / 1000; // in seconds

    if (timeDifference < 1) {
      return "Now";
    } else if (timeDifference < 60) {
      return `${Math.floor(timeDifference)} s`; // seconds
    } else if (timeDifference < 3600) {
      return `${Math.floor(timeDifference / 60)} m`; // minutes
    } else if (timeDifference < 86400) {
      return `${Math.floor(timeDifference / 3600)} h`; // hours
    } else if (timeDifference < 604800) {
      return `${Math.floor(timeDifference / 86400)} d`; // days
    } else {
      return `${Math.floor(timeDifference / 604800)} w`; // weeks
    }
  };

  const formattedTime = formatTimeAgo(comment.createdAt);

  return (
    <div className="post-comment">
      <Link to={`/${comment.userId.userName}`}>
        {comment.userId.profilePicture ? (
          <img
            src={comment.userId.profilePicture}
            alt="User"
            className="post-comment-avatar"
          />
        ) : (
          <span className="post-comment-avatar">
            {comment.userId.fullName[0]}
          </span>
        )}
      </Link>
      <div className="post-comment-text">
        <Link to={`/${comment.userId.userName}`}>
          <strong className="post-comment-username">
            {comment.userId.userName}
          </strong>
        </Link>
        &nbsp;&nbsp;
        <span className="post-comment-text">{comment.commentText}</span>
        <div className="post-comment-interaction">
          <span>{formattedTime}</span>
          {commentLikesCount !== 0 && (
            <span>
              {commentLikesCount} {commentLikesCount === 1 ? "like" : "likes"}
            </span>
          )}
          <span>Reply</span>
          <i className="uil uil-ellipsis-h menu-icon"></i>
        </div>
      </div>
      <button className="toggle-like-button" onClick={handleCommentLikeToggle}>
        {isCommentLiked ? (
          <i className="fa-solid fa-heart filled-heart"></i>
        ) : (
          <i className="fa-regular fa-heart"></i>
        )}
      </button>
    </div>
  );
};

PostComment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    userId: PropTypes.shape({
      profilePicture: PropTypes.string,
      fullName: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
    }).isRequired,
    commentText: PropTypes.string.isRequired,
    createdAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]).isRequired,
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default PostComment;
