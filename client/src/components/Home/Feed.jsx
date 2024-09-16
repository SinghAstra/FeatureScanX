import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import FeedSkeleton from "../../Skeleton/Home/FeedSkeleton";
import FeedPost from "./FeedPost";

const Feed = ({ setIsFeedEmpty }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchFeedPosts = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/api/posts/feed`, {
        params: { page, limit: 10 },
        withCredentials: true,
      });

      setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);

      if (page >= response.data.totalPages) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      if (page === 1 && posts.length === 0) {
        setIsFeedEmpty(true);
        return;
      } else {
        setIsFeedEmpty(false);
      }

      console.log("response.data --fetchFeedPosts is ", response.data);
    } catch (error) {
      console.log("error is ", error);
      console.log("error.message --fetchFeedPosts is :", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedPosts(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1); // Load the next page
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
    return <FeedSkeleton />;
  }

  if (posts.length === 0) {
    return null;
  }
  return (
    <div className="feed">
      {posts.map((post) => (
        <FeedPost key={post._id} post={post} />
      ))}
      <div ref={observerRef} className="loading-more-feed-posts">
        {loading && (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

Feed.propTypes = {
  setIsFeedEmpty: PropTypes.func.isRequired,
};

export default Feed;
