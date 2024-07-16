import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../styles/MediaGallery.css";

const MediaGallery = ({ files, showMediaGallery }) => {
  return (
    <div
      className={`media-gallery-container ${showMediaGallery ? "show" : ""}`}
    >
      <div className="media-images-container">
        {files.map((file, index) => (
          <div className="media-image">
            <div
              key={index}
              className="media-image-content"
              style={{
                backgroundImage: `url(${file})`,
              }}
            >
              <div className="delete-icon">
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="add-images-container">
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </div>
  );
};

export default MediaGallery;
