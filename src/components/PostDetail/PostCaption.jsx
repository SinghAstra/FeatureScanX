import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../../styles/PostCaption.css";

const PostCaption = ({ post }) => {
  return (
    <div className="post-caption">
      <Link to={`/${post.userId.userName}`}>
        {post.userId.profilePicture ? (
          <img src={post.userId.profilePicture} alt="user" className="avatar" />
        ) : (
          <span className="avatar">{post.userId.fullName[0]}</span>
        )}
      </Link>
      <div className="post-caption-content">
        <Link to={`/${post.userId.userName}`}>
          <strong className="username">
            {post.userId.userName} &nbsp;&nbsp;
          </strong>
        </Link>
        <span className="post-caption-text">{post.caption}</span>
      </div>
    </div>
  );
};

PostCaption.propTypes = {
  post: PropTypes.shape({
    userId: PropTypes.shape({
      userName: PropTypes.string.isRequired,
      profilePicture: PropTypes.string,
      fullName: PropTypes.string.isRequired,
    }).isRequired,
    caption: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostCaption;
