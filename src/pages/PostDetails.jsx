import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MediaSlideShow from "../components/PostDetail/MediaSlideShow.jsx";
import PostInfo from "../components/PostDetail/PostInfo.jsx";
import "../styles/PostDetails.css";
import PageNotFound from "./PageNotFound.jsx";

const PostDetails = () => {
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/posts/${postId}`,
          {
            withCredentials: true,
          }
        );
        setPost(response.data.post);
        setIsPostLiked(response.data.likedByCurrentUser);
        console.log("response.data --fetchPost is ", response.data);
      } catch (error) {
        console.log("error.message --fetchPost is ", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>;
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
        <MediaSlideShow media={post.media} />
        <PostInfo post={post} isPostLikedByCurrentUser={isPostLiked} />
      </div>
    </div>
  );
};

export default PostDetails;
