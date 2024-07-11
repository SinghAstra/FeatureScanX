import { faPhotoVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import "../styles/CreatePostDialog.css";

const InitialView = ({ onSelectFile }) => {
  const fileInputRef = useRef();

  const handleSelectFromComputer = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onSelectFile(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="dialog-header">
        <h2>Create New Post</h2>
      </div>
      <div className="dialog-content">
        <FontAwesomeIcon icon={faPhotoVideo} size="5x" />
        <p>Drag Photos and Videos here</p>
        <button onClick={handleSelectFromComputer}>Select From Computer</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          multiple
        />
      </div>
    </>
  );
};

export default InitialView;
