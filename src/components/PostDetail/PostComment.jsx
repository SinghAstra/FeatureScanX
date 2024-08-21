import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

const PostComment = ({ comment }) => {
  const [like, setLike] = useState(false);

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
          <span>7 s</span>
          <span>5 likes</span>
          <span>Reply</span>
          <i className="uil uil-ellipsis-h menu-icon"></i>
        </div>
      </div>
      <button className="toggle-like-button" onClick={() => setLike(!like)}>
        {like ? (
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
    userId: PropTypes.shape({
      profilePicture: PropTypes.string,
      fullName: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
    }).isRequired,
    commentText: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostComment;
