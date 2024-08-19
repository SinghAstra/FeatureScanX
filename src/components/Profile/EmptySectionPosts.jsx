import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import "../../styles/EmptySectionPosts.css";
import CreatePostModal from "../CreatePost/CreatePostModal";
const EmptySectionPosts = ({ username }) => {
  const { currentUser } = useContext(AuthContext);
  const isCurrentUser = currentUser.userName === username;

  const [createPostModal, setCreatePostModal] = useState(false);
  return (
    <div className="empty-section-posts">
      <div className="icon">
        <img src="/camera.png" alt="camera" />
      </div>
      {isCurrentUser ? (
        <>
          <h1>Share photos</h1>
          <p>When you share photos, they will appear on your profile.</p>
          <p
            className="create-post-button"
            onClick={() => setCreatePostModal(true)}
          >
            Share your first photo.
          </p>
          {createPostModal && (
            <CreatePostModal
              modalShown={createPostModal}
              setModalShown={setCreatePostModal}
            />
          )}
        </>
      ) : (
        <h1>No Posts Yet.</h1>
      )}
    </div>
  );
};

export default EmptySectionPosts;
