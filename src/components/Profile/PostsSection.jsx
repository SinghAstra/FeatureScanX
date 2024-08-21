import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostsSectionSkeleton from "../../Skeleton/PostsSectionSkeleton";
import EmptyPostsSection from "../../placeholders/Profile/EmptyPostsSection";
import "../../styles/PostsSection.css";
import ProgressivePostImage from "./ProgressivePostImage";

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

  if (loading) {
    return <PostsSectionSkeleton />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (posts.length === 0) {
    return <EmptyPostsSection username={username} />;
  }

  return (
    <div className="posts-grid">
      {posts.map((post) => (
        <Link to={`/posts/${post._id}`} key={post._id} className="post-item">
          {post.media[0].type === "image" ? (
            <ProgressivePostImage
              lowResUrl={post.media[0].lowResUrl}
              highResUrl={post.media[0].highResUrl}
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
  );
};

export default PostsSection;
