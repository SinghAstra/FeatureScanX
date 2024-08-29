import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import MediaSlideShow from "../PostDetail/MediaSlideShow";
import RecentComment from "./RecentComment";

const FeedPost = ({ post }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [isPostLiked, setIsPostLiked] = useState(post.isLikedByCurrentUser);
  const [isPostBookmarked, setIsPostBookmarked] = useState(
    currentUser.savedPosts.includes(post._id)
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [postLikesCount, setPostLikesCount] = useState(post.likes.length);
  const [comment, setComment] = useState("");
  const [commentCount, setCommentCount] = useState(post.totalComments);
  const [recentComments, setRecentComments] = useState(
    post.comments.slice(0, 3)
  );
  const apiUrl = import.meta.env.VITE_API_URL;
  const limit = 40;

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

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLikePostToggle = async () => {
    try {
      // Handle the UI Optimistically
      setIsPostLiked((isPostLiked) => !isPostLiked);
      const response = await axios.get(`${apiUrl}/api/posts/${post._id}/like`, {
        withCredentials: true,
      });
      setPostLikesCount(response.data.likes);
      console.log("response.data -- handleLikePostToggle is ", response.data);
    } catch (error) {
      // if error comes in updating the backend, revert back to the original state
      setIsPostLiked((isPostLiked) => !isPostLiked);
      console.log("error.message --handleLikePostToggle is :", error.message);
    }
  };

  const handleBookmarkToggle = async () => {
    try {
      // Handle the UI Optimistically
      setIsPostBookmarked(!isPostBookmarked);
      const response = await axios.get(
        `${apiUrl}/api/saved-post/${post._id}/toggle`,
        {
          withCredentials: true,
        }
      );
      setCurrentUser({ ...currentUser, savedPosts: response.data.savedPosts });
      console.log("response.data --handleBookmarkToggle is ", response.data);
    } catch (error) {
      // if error comes in updating the backend, revert back to the original state
      setIsPostBookmarked(!isPostBookmarked);
      console.log("error.message --handleBookmarkToggle is :", error.message);
    }
  };

  const handleCommentSubmit = async () => {
    if (comment.trim() === "") return;

    try {
      const response = await axios.post(
        `${apiUrl}/api/posts/${post._id}/comment`,
        {
          commentText: comment,
        },
        { withCredentials: true }
      );
      setCommentCount(response.data.commentCount);
      setRecentComments([...recentComments, response.data.comment].slice(-3));

      console.log("response.data --handleCommentSubmit is ", response.data);
    } catch (error) {
      console.log("error.message --handleCommentSubmit is :", error.message);
    }
  };

  return (
    <div className="feed-post">
      <Link className="feed-post-author" to={`/${post.userId.userName}`}>
        {post.userId.profilePicture ? (
          <img
            src={post.userId.profilePicture}
            alt="author"
            className="feed-post-author-avatar"
          />
        ) : (
          <span className="feed-post-author-avatar">
            {post.userId.fullName[0]}
          </span>
        )}
        <div className="feed-post-author-info">
          <strong>{post.userId.userName}</strong>
        </div>
        <span className="feed-post-createdAt">
          {formatTimeAgo(post.createdAt)}
        </span>
      </Link>
      <div className="feed-post-media">
        <MediaSlideShow media={post.media} />
      </div>
      <div className="feed-post-action-icons">
        <div className="feed-post-interactions-icon">
          <button className="post-like-btn" onClick={handleLikePostToggle}>
            {isPostLiked ? (
              <i className="fa-solid fa-heart filled-heart"></i>
            ) : (
              <i className="fa-regular fa-heart"></i>
            )}
          </button>
          <Link to={`/posts/${post.slug}`} className="post-comment-btn">
            <i className="fa-regular fa-comment"></i>
          </Link>
          <button className="post-share-btn">
            <i className="fa-regular fa-paper-plane"></i>
          </button>
        </div>
        <button className="post-bookmark-btn" onClick={handleBookmarkToggle}>
          {isPostBookmarked ? (
            <i className="fa-solid fa-bookmark"></i>
          ) : (
            <i className="fa-regular fa-bookmark"></i>
          )}
        </button>
      </div>
      <span className="feed-post-likes-counter">
        {postLikesCount > 0
          ? postLikesCount > 1
            ? `${postLikesCount} likes`
            : `${postLikesCount} like`
          : "Be the first to like this."}
      </span>{" "}
      <p className="feed-post-caption">
        <strong>{post.userId.userName} </strong>{" "}
        {isExpanded
          ? renderCaptionWithLinks(post.caption)
          : renderCaptionWithLinks(
              `${post.caption.substring(0, limit)}...`
            )}{" "}
        {post.caption.length > limit && (
          <span onClick={toggleReadMore} className="read-more">
            {isExpanded ? " Show Less" : " Read More"}
          </span>
        )}
      </p>
      {commentCount > 0 && (
        <Link to={`/posts/${post.slug}`} className="feed-post-comments-counter">
          View all {commentCount} comment
          {commentCount > 1 && "s"}
        </Link>
      )}
      <div className="feed-post-recent-comments">
        {recentComments.map((comment) => {
          return <RecentComment comment={comment} key={comment._id} />;
        })}
      </div>
      <input
        type="text"
        placeholder="Add a comment..."
        className="add-comment-input"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleCommentSubmit();
          }
        }}
      />
    </div>
  );
};

FeedPost.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    isLikedByCurrentUser: PropTypes.bool.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,
    totalComments: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        userId: PropTypes.shape({
          userName: PropTypes.string.isRequired,
        }).isRequired,
        commentText: PropTypes.string.isRequired,
      })
    ).isRequired,
    userId: PropTypes.shape({
      userName: PropTypes.string.isRequired,
      profilePicture: PropTypes.string,
      fullName: PropTypes.string.isRequired,
    }).isRequired,
    caption: PropTypes.string.isRequired,
    media: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf(["image", "video"]).isRequired,
        lowResUrl: PropTypes.string,
        highResUrl: PropTypes.string,
        url: PropTypes.string,
      })
    ).isRequired,
    slug: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeedPost;
