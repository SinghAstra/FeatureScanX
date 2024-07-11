import {
  faCompass,
  faFilm,
  faHome,
  faPlusCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../styles/BottomNavigation.css";
import CreatePostDialog from "./CreatePostDialog";

const BottomNavigation = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreatePost = (post) => {
    console.log("New Post:", post);
    // Here you would typically make an API call to save the post to the backend
  };
  return (
    <div className="bottom-navbar">
      <div className="bottom-navbar-link">
        <FontAwesomeIcon icon={faHome} />
      </div>
      <div className="bottom-navbar-link">
        <FontAwesomeIcon icon={faCompass} />
      </div>
      <div className="bottom-navbar-link">
        <FontAwesomeIcon icon={faFilm} />
      </div>
      <div className="bottom-navbar-link" onClick={() => setIsDialogOpen(true)}>
        <FontAwesomeIcon icon={faPlusCircle} />
      </div>
      <div className="bottom-navbar-link">
        <FontAwesomeIcon icon={faUser} />
      </div>
      <CreatePostDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreate={handleCreatePost}
      />
    </div>
  );
};

export default BottomNavigation;
