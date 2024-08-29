import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const RecentComment = ({ comment }) => {
  const { currentUser } = useContext(AuthContext);
  const [isCommentLiked, setIsCommentLiked] = useState(
    comment.likes.includes(currentUser._id)
  );
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleCommentLikeToggle = async () => {
    try {
      // update the ui optimistically
      setIsCommentLiked((prev) => !prev);
      const response = await axios.post(
        `${apiUrl}/api/comments/${comment._id}/like`,
        {},
        { withCredentials: true }
      );
      console.log("response.data --handleCommentLikeToggle is ", response.data);
    } catch (error) {
      // revert back to original state if error occurs in updating the backend
      setIsCommentLiked((prev) => !prev);
      console.log("error.message --handleCommentLikeToggle is ", error.message);
    }
  };

  return (
    <div className="feed-post-recent-comment">
      <Link to={`/${comment.userId.userName}`}>
        <strong>{comment.userId.userName} </strong> {comment.commentText}
      </Link>
      <button className="comment-like-button" onClick={handleCommentLikeToggle}>
        {isCommentLiked ? (
          <i className="fa-solid fa-heart filled-heart"></i>
        ) : (
          <i className="fa-regular fa-heart"></i>
        )}
      </button>
    </div>
  );
};

export default RecentComment;
