const FeedPostSkeleton = () => {
  return (
    <div className="feed-post">
      <div className="feed-post-author">
        <div className="feed-post-author-avatar skeleton"></div>
        <div className="feed-post-author-info-skeleton">
          <p className="feed-post-author-username-skeleton skeleton"></p>
          <p className="feed-post-author-location-skeleton skeleton"></p>
        </div>
      </div>
      <div className="feed-post-media-skeleton skeleton"></div>
    </div>
  );
};

export default FeedPostSkeleton;
