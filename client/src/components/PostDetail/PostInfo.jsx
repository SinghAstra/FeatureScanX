import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import EmptyComments from "../../placeholders/PostDetails/EmptyComments";
import PostCommentsSkeleton from "../../Skeleton/PostCommentsSkeleton";
import PostAuthorProfile from "./PostAuthorProfile";
import PostCaption from "./PostCaption";
import PostComment from "./PostComment";

const PostInfo = ({ post, isPostLikedByCurrentUser }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [isPostLiked, setIsPostLiked] = useState(isPostLikedByCurrentUser);
  const [postLikesCount, setPostLikesCount] = useState(post.likes.length);
  const [isPostBookmarked, setIsPostBookmarked] = useState(
    currentUser.savedPosts.includes(post._id)
  );
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const commentInputRef = useRef(null);
  const commentsContainerRef = useRef(null);
  const [parentId, setParentId] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

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
      let updatedComment = comment;

      if (parentId) {
        const parentComment = comments.find(
          (comment) => comment._id === parentId
        );
        const parentUserName = parentComment?.userId?.userName;

        if (parentUserName) {
          updatedComment = `@${parentUserName} ` + comment;
        }
      }
      const response = await axios.post(
        `${apiUrl}/api/posts/${post._id}/comment`,
        {
          commentText: updatedComment,
          parentId,
        },
        { withCredentials: true }
      );
      if (parentId) {
        const updatedComments = comments.map((c) =>
          c._id === parentId ? { ...c, replyCount: c.replyCount + 1 } : c
        );
        setComments(updatedComments);
        setComment("");
        setParentId(null);
      } else {
        setComments([response.data.comment, ...comments]);
        setComment("");
        if (commentsContainerRef.current) {
          commentsContainerRef.current.scrollTop = 0;
        }
      }
      console.log("parentId is ", parentId);
      console.log("response.data --handleCommentSubmit is ", response.data);
    } catch (error) {
      console.log("error.message --handleCommentSubmit is :", error.message);
    }
  };

  const formatDate = (createdAt) => {
    const postDate = new Date(createdAt);
    const now = new Date();
    const timeDiff = now - postDate; // time difference in milliseconds

    const secondsDiff = Math.floor(timeDiff / 1000); // convert to seconds
    const minutesDiff = Math.floor(timeDiff / (1000 * 60)); // convert to minutes
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60)); // convert to hours
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // convert to days

    // If less than 1 minute ago, show seconds ago
    if (secondsDiff < 60) {
      return `${secondsDiff} second${secondsDiff === 1 ? "" : "s"} ago`;
    }

    // If less than 1 hour ago, show minutes ago
    if (minutesDiff < 60) {
      return `${minutesDiff} minute${minutesDiff === 1 ? "" : "s"} ago`;
    }

    // If less than 1 day ago, show hours ago
    if (hoursDiff < 24) {
      return `${hoursDiff} hour${hoursDiff === 1 ? "" : "s"} ago`;
    }

    // If within the last 7 days, show days ago
    if (daysDiff <= 7) {
      return `${daysDiff} day${daysDiff === 1 ? "" : "s"} ago`;
    }

    // If the post is more than 7 days ago, display the full date
    const postYear = postDate.getFullYear();
    const currentYear = now.getFullYear();

    const options = { day: "numeric", month: "long" }; // e.g., "10 August"
    const formattedDate = postDate.toLocaleDateString(undefined, options);

    // Show full date with year if it's from a previous year
    if (postYear === currentYear) {
      return formattedDate; // e.g., "10 August"
    } else {
      return `${formattedDate} ${postYear}`; // e.g., "1 July 2023"
    }
  };

  const handleSharePost = async () => {
    const shareData = {
      title: post.caption,
      text: `Check out this post by ${post.userId.userName}`,
      url: window.location.href, // or a specific URL to share
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log("Post shared successfully!");
        // Optionally, update the share count or state here
      } else {
        // Fallback for browsers that don't support the Share API
        console.log("Share not supported");
      }
    } catch (error) {
      console.log("Error sharing post:", error);
    }
  };

  const handleReply = (commentId) => {
    setParentId(commentId);
    console.log(
      "Comment to be replied is ",
      comments.find((comment) => comment._id === commentId)
    );
    setComment(
      `@${
        comments.find((comment) => comment._id === commentId)?.userId?.userName
      } ` + " "
    );
    commentInputRef.current.focus();
  };

  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const response = await axios.get(
        `${apiUrl}/api/posts/${post._id}/comments?page=${page}&limit=10`,
        {
          withCredentials: true,
        }
      );
      setComments((prevComments) => [
        ...prevComments,
        ...response.data.comments,
      ]);
      if (page >= response.data.totalPages) {
        setHasMore(false);
      }
      console.log("response.data --fetchComments is ", response.data);
    } catch (error) {
      console.log("error.message --fetchComments is :", error.message);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl, post._id, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingComments) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    const currentObserver = observerRef.current;
    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
    };
  }, [hasMore, loadingComments]);

  return (
    <div className="post-info-container">
      <PostAuthorProfile userId={post.userId} />
      {loadingComments && page === 1 ? (
        <PostCommentsSkeleton />
      ) : (
        <>
          {post.caption === "" && comments.length === 0 ? (
            <EmptyComments />
          ) : (
            <div className="post-comments-container" ref={commentsContainerRef}>
              <PostCaption post={post} />
              {comments.map((comment) => (
                <PostComment
                  key={comment._id}
                  comment={comment}
                  handleReply={() => handleReply(comment._id)}
                />
              ))}
              <div ref={observerRef} className="loading-more-followers">
                {loadingComments && (
                  <div className="spinner-container">
                    <div className="spinner"></div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
      <div className="post-actions">
        <div className="post-action-icons">
          <div className="post-interactions-icon">
            <button className="post-like-btn" onClick={handleLikePostToggle}>
              {isPostLiked ? (
                <i className="fa-solid fa-heart filled-heart"></i>
              ) : (
                <i className="fa-regular fa-heart"></i>
              )}
            </button>
            <button
              className="post-comment-btn"
              onClick={() => commentInputRef.current.focus()}
            >
              <i className="fa-regular fa-comment"></i>
            </button>
            <button className="post-share-btn" onClick={handleSharePost}>
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
        <div className="post-likes-count">
          {postLikesCount === 0
            ? "Be the first to like this."
            : `${postLikesCount} likes`}
        </div>
        <div className="post-createdAt"> {formatDate(post.createdAt)}</div>
      </div>
      <div className="add-comment-container">
        {parentId && (
          <div className="reply-indicator">
            <button
              className="cancel-reply"
              onClick={() => {
                setParentId(null);
                setComment("");
              }}
            >
              ✕
            </button>
          </div>
        )}
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="add-comment-input"
          ref={commentInputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleCommentSubmit();
            }
          }}
        />
        <button
          className={`add-comment-btn ${
            comment.trim() === "" ? "disabled" : ""
          }`}
          onClick={handleCommentSubmit}
        >
          {parentId ? "Reply" : "Post"}
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
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,
    caption: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  isPostLikedByCurrentUser: PropTypes.bool.isRequired,
};

export default PostInfo;
