import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostsSectionSkeleton from "../../Skeleton/PostsSectionSkeleton";
import EmptyPostsSection from "../../placeholders/Profile/EmptyPostsSection";
import "../../styles/PostsSection.css";
import ProgressivePostImage from "./ProgressivePostImage";

const PostsSection = () => {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchUserPosts = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiUrl}/api/users/${username}/posts`,
        { params: { page, limit: 10 }, withCredentials: true }
      );
      setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
      if (page >= response.data.totalPages) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      console.log("response.data --fetchUserPosts is ", response.data);
    } catch (err) {
      console.log("error --fetchUserPosts is ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPosts(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
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
  }, [hasMore, loading]);

  if (loading && page === 1) {
    return <PostsSectionSkeleton />;
  }

  if (posts.length === 0) {
    return <EmptyPostsSection username={username} />;
  }

  return (
    <div>
      <div className="posts-grid">
        {posts.map((post) => (
          <Link to={`/posts/${post.slug}`} key={post._id} className="post-item">
            {post.media[0].type === "image" ? (
              <ProgressivePostImage
                lowResUrl={post.media[0].lowResUrl}
                highResUrl={post.media[0].highResUrl}
                likes={post.likes.length}
                comments={post.comments.length}
                alt="Post media"
              />
            ) : (
              <video
                src={post.media[0].url}
                className="post-thumbnail"
                muted
                loop
              />
            )}
          </Link>
        ))}
      </div>
      <div ref={observerRef} className="loading-more-posts">
        {loading && (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsSection;
