import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MediaSlideShow from "../components/PostDetail/MediaSlideShow.jsx";
import PostInfo from "../components/PostDetail/PostInfo.jsx";
import PostDetailsSkeleton from "../Skeleton/PostDetailsSkeleton.jsx";
import PageNotFound from "./PageNotFound.jsx";

const PostDetails = () => {
  const { postSlug } = useParams();
  const [postLoading, setPostLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostDetailUsingId = async () => {
      try {
        setPostLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/posts/${postSlug}`,
          {
            withCredentials: true,
          }
        );
        setPost(response.data.post);
        setIsPostLiked(response.data.likedByCurrentUser);
        console.log(
          "response.data --fetchPostDetailUsingId is ",
          response.data
        );
      } catch (error) {
        console.log(
          "error.message --fetchPostDetailUsingId is ",
          error.message
        );
      } finally {
        setPostLoading(false);
      }
    };

    fetchPostDetailUsingId();
  }, [postSlug]);

  if (postLoading) {
    return <PostDetailsSkeleton />;
  }

  if (!post) {
    return <PageNotFound />;
  }

  return (
    <div className="post-detail-backdrop" onClick={() => navigate(-1)}>
      <div
        className="post-detail-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="post-detail-media-container">
          <div className="post-detail-media">
            <MediaSlideShow media={post.media} />
          </div>
        </div>
        <PostInfo post={post} isPostLikedByCurrentUser={isPostLiked} />
      </div>
    </div>
  );
};

export default PostDetails;
