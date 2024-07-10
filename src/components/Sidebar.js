import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faBell,
  faCompass,
  faEllipsisH,
  faEnvelope,
  faFilm,
  faHome,
  faPlusCircle,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import CreatePostDialog from "../pages/CreatePostDialog";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreatePost = (post) => {
    console.log("New Post:", post);
    // Here you would typically make an API call to save the post to the backend
  };

  return (
    <div className="sidebar">
      <h1>Social</h1>
      <div className="sidebar-link sidebar-icon">
        <FontAwesomeIcon icon={faInstagram} />
      </div>
      <div className="sidebar-links">
        <div className="sidebar-link">
          <FontAwesomeIcon icon={faHome} />
          <p>Home</p>
        </div>
        <div className="sidebar-link">
          <FontAwesomeIcon icon={faSearch} />
          <p>Search</p>
        </div>
        <div className="sidebar-link">
          <FontAwesomeIcon icon={faCompass} />
          <p>Explore</p>
        </div>
        <div className="sidebar-link">
          <FontAwesomeIcon icon={faFilm} />
          <p>Reels</p>
        </div>
        <div className="sidebar-link">
          <FontAwesomeIcon icon={faEnvelope} />
          <p>Messages</p>
        </div>
        <div className="sidebar-link">
          <FontAwesomeIcon icon={faBell} />
          <p>Notifications</p>
        </div>
        <div className="sidebar-link" onClick={() => setIsDialogOpen(true)}>
          <FontAwesomeIcon icon={faPlusCircle} />
          <p>Create</p>
        </div>
        <div className="sidebar-link">
          <FontAwesomeIcon icon={faUser} />
          <p>Profile</p>
        </div>
      </div>
      <div className="sidebar-bottom">
        <div className="sidebar-link">
          <FontAwesomeIcon icon={faEllipsisH} />
          <p>More</p>
        </div>
      </div>
      <CreatePostDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreate={handleCreatePost}
      />
    </div>
  );
};

export default Sidebar;
