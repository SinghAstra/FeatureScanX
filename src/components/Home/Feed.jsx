import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/Feed.css";
import FeedPost from "./FeedPost";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/posts/feed",
          { withCredentials: true }
        );
        setPosts(response.data.posts);
        console.log("response.data --fetchFeedPosts is ", response.data);
      } catch (error) {
        console.log("error.message --fetchFeedPosts is :", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="feed">
      {posts.map((post) => (
        <FeedPost key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
