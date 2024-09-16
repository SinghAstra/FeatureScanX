import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PostCaption = ({ post }) => {
  const renderCaptionWithLinks = (caption) => {
    const parts = caption.split(/(@[a-zA-Z0-9_]+)/g);

    return parts.map((part, index) => {
      if (part.startsWith("@")) {
        const username = part.slice(1);
        return (
          <Link key={index} to={`/${username}`} className="username-link">
            {part}
          </Link>
        );
      }
      return part;
    });
  };

  if (post.caption === "") {
    return;
  }

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
        <span className="post-caption-text">
          {renderCaptionWithLinks(post.caption)}
        </span>
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
