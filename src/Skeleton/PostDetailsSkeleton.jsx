import { useNavigate } from "react-router-dom";
import "../styles/PostDetailsSkeleton.css";
import PostCommentsSkeleton from "./PostCommentsSkeleton";

const PostDetailsSkeleton = () => {
  const navigate = useNavigate(-1);

  return (
    <div className="post-detail-backdrop" onClick={() => navigate(-1)}>
      <div
        className="post-detail-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="post-media-slider skeleton"></div>
        <div className="post-info-container-skeleton">
          <div className="user-item-skeleton post-author-skeleton">
            <div className="user-avatar-skeleton skeleton"></div>
            <div className="user-info-skeleton">
              <span className="username-skeleton skeleton"></span>
              <span className="user-fullName-skeleton skeleton"></span>
            </div>
          </div>
          <PostCommentsSkeleton />
        </div>
      </div>
    </div>
  );
};

export default PostDetailsSkeleton;
