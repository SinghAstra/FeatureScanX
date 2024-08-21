import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/PostDetails.css";

const PostDetails = () => {
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [like, setLike] = useState(true);
  const [postLike, setPostLike] = useState(false);
  const [postBookmark, setPostBookmark] = useState(false);

  const toggleLike = () => {
    setLike(!like);
  };

  const togglePostLike = () => {
    setPostLike(!postLike);
  };

  const togglePostBookmark = () => {
    setPostBookmark(!postBookmark);
  };

  const handleBackdropClick = () => {
    navigate(-1);
  };

  return (
    <div className="post-detail-backdrop" onClick={handleBackdropClick}>
      <div
        className="post-detail-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="post-image-container">
          <img
            src="https://captainfi.com/wp-content/uploads/2022/08/Unsplash-images-4-1024x678.jpg"
            alt="Post"
            className="post-image"
          />
        </div>
        <div className="post-info-container">
          <div className="post-author-profile">
            <Link to={`/username`} className="post-author-nav">
              <img
                src="https://captainfi.com/wp-content/uploads/2022/08/Unsplash-images-4-1024x678.jpg"
                alt="User"
                className="post-author-avatar"
              />
              <span className="post-author-username">username</span>
            </Link>
            {/* <i className="uil uil-ellipsis-h"></i> */}
          </div>

          <div className="post-comments-container">
            {/* <div className="post-caption">
              <img
                src="https://captainfi.com/wp-content/uploads/2022/08/Unsplash-images-4-1024x678.jpg"
                alt="User"
                className="post-caption-user-avatar"
              />
              <div className="post-caption-content">
                <span className="post-caption-username">username</span>
                <p className="post-caption-text">This is the post caption.</p>
              </div>
            </div> */}

            <div className="post-comment">
              <img
                src="https://captainfi.com/wp-content/uploads/2022/08/Unsplash-images-4-1024x678.jpg"
                alt="User"
                className="post-comment-avatar"
              />
              <div className="post-comment-text">
                <strong className="post-comment-username">commenter1</strong>
                &nbsp;&nbsp;&nbsp;
                <span className="post-comment-text">
                  This is a placeholder comment. I am commenting just for the
                  purpose of testing instgarm ui as i am building a similar
                  project .Please do not mind me.This is a placeholder comment.
                  I am commenting just for the purpose of testing instgarm ui as
                  i am building a similar project .Please do not mind me.This is
                  a placeholder comment. I am commenting just for the purpose of
                  testing instgarm ui as i am building a similar project .Please
                  do not mind me.
                </span>
                <div className="post-comment-interaction">
                  <span>7 s</span>
                  <span>5 likes</span>
                  <span>Reply</span>
                  <i className="uil uil-ellipsis-h menu-icon"></i>
                </div>
              </div>
              <button className="toggle-like-button" onClick={toggleLike}>
                {like ? (
                  <i className="fa-solid fa-heart filled-heart"></i>
                ) : (
                  <i className="fa-regular fa-heart"></i>
                )}
              </button>
            </div>
            <div className="post-comment">
              <img
                src="https://captainfi.com/wp-content/uploads/2022/08/Unsplash-images-4-1024x678.jpg"
                alt="User"
                className="post-comment-avatar"
              />
              <div className="post-comment-text">
                <strong className="post-comment-username">commenter1</strong>
                &nbsp;&nbsp;&nbsp;
                <span className="post-comment-text">
                  This is a placeholder comment. I am commenting just for the
                  purpose of testing instgarm ui as i am building a similar
                  project .Please do not mind me.This is a placeholder comment.
                  I am commenting just for the purpose of testing instgarm ui as
                  i am building a similar project .Please do not mind me.This is
                  a placeholder comment. I am commenting just for the purpose of
                  testing instgarm ui as i am building a similar project .Please
                  do not mind me.
                </span>
                <div className="post-comment-interaction">
                  <span>7 s</span>
                  <span>5 likes</span>
                  <span>Reply</span>
                  <i className="uil uil-ellipsis-h menu-icon"></i>
                </div>
              </div>
              <button className="toggle-like-button" onClick={toggleLike}>
                {like ? (
                  <i className="fa-solid fa-heart filled-heart"></i>
                ) : (
                  <i className="fa-regular fa-heart"></i>
                )}
              </button>
            </div>
            <div className="post-comment">
              <img
                src="https://captainfi.com/wp-content/uploads/2022/08/Unsplash-images-4-1024x678.jpg"
                alt="User"
                className="post-comment-avatar"
              />
              <div className="post-comment-text">
                <strong className="post-comment-username">commenter1</strong>
                &nbsp;&nbsp;&nbsp;
                <span className="post-comment-text">
                  This is a placeholder comment. I am commenting just for the
                  purpose of testing instgarm ui as i am building a similar
                  project .Please do not mind me.This is a placeholder comment.
                  I am commenting just for the purpose of testing instgarm ui as
                  i am building a similar project .Please do not mind me.This is
                  a placeholder comment. I am commenting just for the purpose of
                  testing instgarm ui as i am building a similar project .Please
                  do not mind me.
                </span>
                <div className="post-comment-interaction">
                  <span>7 s</span>
                  <span>5 likes</span>
                  <span>Reply</span>
                  <i className="uil uil-ellipsis-h menu-icon"></i>
                </div>
              </div>
              <button className="toggle-like-button" onClick={toggleLike}>
                {like ? (
                  <i className="fa-solid fa-heart filled-heart"></i>
                ) : (
                  <i className="fa-regular fa-heart"></i>
                )}
              </button>
            </div>
            <div className="post-comment">
              <img
                src="https://captainfi.com/wp-content/uploads/2022/08/Unsplash-images-4-1024x678.jpg"
                alt="User"
                className="post-comment-avatar"
              />
              <div className="post-comment-text">
                <strong className="post-comment-username">commenter1</strong>
                &nbsp;&nbsp;&nbsp;
                <span className="post-comment-text">
                  This is a placeholder comment. I am commenting just for the
                  purpose of testing instgarm ui as i am building a similar
                  project .Please do not mind me.This is a placeholder comment.
                  I am commenting just for the purpose of testing instgarm ui as
                  i am building a similar project .Please do not mind me.This is
                  a placeholder comment. I am commenting just for the purpose of
                  testing instgarm ui as i am building a similar project .Please
                  do not mind me.
                </span>
                <div className="post-comment-interaction">
                  <span>7 s</span>
                  <span>5 likes</span>
                  <span>Reply</span>
                  <i className="uil uil-ellipsis-h menu-icon"></i>
                </div>
              </div>
              <button className="toggle-like-button" onClick={toggleLike}>
                {like ? (
                  <i className="fa-solid fa-heart filled-heart"></i>
                ) : (
                  <i className="fa-regular fa-heart"></i>
                )}
              </button>
            </div>
            <div className="post-comment">
              <img
                src="https://captainfi.com/wp-content/uploads/2022/08/Unsplash-images-4-1024x678.jpg"
                alt="User"
                className="post-comment-avatar"
              />
              <div className="post-comment-text">
                <strong className="post-comment-username">commenter1</strong>
                &nbsp;&nbsp;&nbsp;
                <span className="post-comment-text">
                  This is a placeholder comment. I am commenting just for the
                  purpose of testing instgarm ui as i am building a similar
                  project .Please do not mind me.This is a placeholder comment.
                  I am commenting just for the purpose of testing instgarm ui as
                  i am building a similar project .Please do not mind me.This is
                  a placeholder comment. I am commenting just for the purpose of
                  testing instgarm ui as i am building a similar project .Please
                  do not mind me.
                </span>
                <div className="post-comment-interaction">
                  <span>7 s</span>
                  <span>5 likes</span>
                  <span>Reply</span>
                  <i className="uil uil-ellipsis-h menu-icon"></i>
                </div>
              </div>
              <button className="toggle-like-button" onClick={toggleLike}>
                {like ? (
                  <i className="fa-solid fa-heart filled-heart"></i>
                ) : (
                  <i className="fa-regular fa-heart"></i>
                )}
              </button>
            </div>
          </div>

          <div className="post-actions">
            <div className="post-action-icons">
              <div className="post-interactions-icon">
                <button className="post-like-btn" onClick={togglePostLike}>
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
                onClick={togglePostBookmark}
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
              placeholder="Add a comment..."
              className="add-comment-input"
            />
            <button className="add-comment-btn">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
