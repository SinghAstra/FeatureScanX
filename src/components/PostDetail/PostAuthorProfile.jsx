import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PostAuthorProfile = ({ userId }) => (
  <div className="post-author-profile">
    <Link to={`/${userId.userName}`} className="post-author-nav">
      {userId.profilePicture ? (
        <img
          src={userId.profilePicture}
          alt={userId.userName}
          className="post-author-avatar"
        />
      ) : (
        <span className="post-author-avatar">{userId.fullName[0]}</span>
      )}
      <span className="post-author-username">{userId.userName}</span>
    </Link>
    <i className="uil uil-ellipsis-h"></i>
  </div>
);

PostAuthorProfile.propTypes = {
  userId: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    profilePicture: PropTypes.string,
    fullName: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostAuthorProfile;
