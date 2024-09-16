import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProgressivePostImage from "../components/Profile/ProgressivePostImage";

const ExplorePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchExplorePosts = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/api/posts/explore`, {
        params: { page, limit: 10 },
        withCredentials: true,
      });
      setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
      if (page >= response.data.totalPages) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      console.log("response.data --fetchExplorePosts is ", response.data);
    } catch (err) {
      console.log("error --fetchExplorePosts is ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExplorePosts(page);
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
            {post.media.length > 1 && (
              <i className="uil uil-square-shape post-item-icon"></i>
            )}
            {post.media[0].type === "video" && (
              <i className="uil uil-square-shape post-item-icon"></i>
            )}
          </Link>
        ))}
        {loading && <div className="post-skeleton"></div>}
        {loading && <div className="post-skeleton"></div>}
        {loading && <div className="post-skeleton"></div>}
        {loading && <div className="post-skeleton"></div>}
        {loading && <div className="post-skeleton"></div>}
        {loading && <div className="post-skeleton"></div>}
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

export default ExplorePage;
