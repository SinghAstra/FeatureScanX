import PropTypes from "prop-types";
import { useState } from "react";
import "../../styles/FollowersFollowingHashTagModal.css";
import Followers from "./Followers";
import Following from "./Following";
import Hashtags from "./Hashtags";

const FollowersFollowingHashTagModal = ({
  username,
  initialTab,
  setShowFFHModal,
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const renderContent = () => {
    switch (activeTab) {
      case "followers":
        return (
          <Followers username={username} setShowFFHModal={setShowFFHModal} />
        );
      case "following":
        return (
          <Following username={username} setShowFFHModal={setShowFFHModal} />
        );
      case "hashtags":
        return (
          <Hashtags username={username} setShowFFHModal={setShowFFHModal} />
        );
      default:
        return null;
    }
  };
  return (
    <div className="modal-backdrop" onClick={() => setShowFFHModal(false)}>
      <div
        className="followers-following-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div
            className={`nav-link ${activeTab === "followers" ? "active" : ""}`}
            onClick={() => setActiveTab("followers")}
          >
            Followers
          </div>
          <div
            className={`nav-link ${activeTab === "following" ? "active" : ""}`}
            onClick={() => setActiveTab("following")}
          >
            Following
          </div>
          <div
            className={`nav-link ${activeTab === "hashtags" ? "active" : ""}`}
            onClick={() => setActiveTab("hashtags")}
          >
            Hashtags
          </div>
        </div>
        <div className="modal-body">{renderContent()}</div>
      </div>
    </div>
  );
};

FollowersFollowingHashTagModal.propTypes = {
  username: PropTypes.string.isRequired,
  initialTab: PropTypes.oneOf(["followers", "following", "hashtags"]),
  setShowFFHModal: PropTypes.func.isRequired,
};

export default FollowersFollowingHashTagModal;
