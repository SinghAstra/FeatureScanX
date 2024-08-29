import MediaSlideShow from "../PostDetail/MediaSlideShow";

const FeedPost = ({ post }) => {
  const isPostLiked = true;
  const isPostBookmarked = false;
  const handleLikePostToggle = () => {};
  const handleBookmarkToggle = () => {};
  return (
    <div className="feed-post">
      <div className="feed-post-author">
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
        <span className="feed-post-createdAt">21h</span>
      </div>
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
          <button className="post-comment-btn">
            <i className="fa-regular fa-comment"></i>
          </button>
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
        {post.likes.length > 0
          ? post.likes.length > 1
            ? `${post.likes.length} likes`
            : `${post.likes.length} like`
          : "Be the first to like this."}
      </span>{" "}
      <p className="feed-post-caption">
        <strong>{post.userId.userName} </strong> {post.caption}
      </p>
      {post.comments.length > 0 && (
        <p className="feed-post-comments-counter">
          View all {post.comments.length} comment
          {post.comments.length > 1 && "s"}
        </p>
      )}
      <input
        type="text"
        placeholder="Add a comment..."
        className="add-comment-input"
      />
    </div>
  );
};

export default FeedPost;
