import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "../../styles/PostComments.css";
import PostCaption from "./PostCaption";
import PostComment from "./PostComment";

const PostComments = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/comments/${post._id}`, {
          withCredentials: true,
        });
        setComments(response.data);
        console.log("response.data --fetchComments is ", response.data);
      } catch (error) {
        console.log("error.message --fetchComments is :", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [apiUrl, post._id]);

  if (loading) {
    return <div className="post-comments-container">Loading Comments....</div>;
  }

  return (
    <div className="post-comments-container">
      <PostCaption post={post} />
      {comments.map((comment) => (
        <PostComment key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

PostComments.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    userId: PropTypes.shape({
      userName: PropTypes.string.isRequired,
      profilePicture: PropTypes.string,
      fullName: PropTypes.string.isRequired,
    }).isRequired,
    caption: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostComments;
