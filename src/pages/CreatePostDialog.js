import { faClose, faPhotoVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import "../styles/CreatePostDialog.css";
const CreatePostDialog = ({ isOpen, onClose }) => {
  const dialogRef = useRef();

  useEffect(() => {
    let timeoutId;

    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100); // Add a small delay to avoid immediate close
    }

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="close-icon">
        <FontAwesomeIcon icon={faClose} />
      </div>
      <div className="dialog" ref={dialogRef}>
        <div className="dialog-header">
          <h2>Create New Post</h2>
        </div>
        <div className="dialog-content">
          <FontAwesomeIcon icon={faPhotoVideo} size="5x" />
          <p>Drag Photos and Videos here</p>
          <button>Select From Computer</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostDialog;
