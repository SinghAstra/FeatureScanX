import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostsSectionSkeleton from "../../skeleton/PostsSectionSkeleton";
import "../../styles/PostsSection.css";

const PostsSection = () => {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        // setLoading(true); ????
        const response = await axios.get(
          `${apiUrl}/api/users/${username}/posts`,
          { withCredentials: true }
        );
        console.log("response.data --fetchUserPosts is ", response.data);
        setPosts(response.data);
      } catch (err) {
        console.log("error --fetchUserPosts is ", err);
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [apiUrl, username]);

  let check = null;
  if (!check) {
    return <PostsSectionSkeleton />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="posts-grid">
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="post-item">
            {post.media[0].type === "image" ? (
              <img
                src={post.media[0].url}
                alt="Post media"
                className="post-thumbnail"
              />
            ) : (
              <video
                src={post.media[0].url}
                className="post-thumbnail"
                muted
                loop
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PostsSection;
