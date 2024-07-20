import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import "../styles/MediaGallery.css";

const MediaGallery = ({ files, setShowMediaGallery }) => {
  const mediaGalleryRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mediaGalleryRef.current &&
        !mediaGalleryRef.current.contains(event.target)
      ) {
        setShowMediaGallery(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowMediaGallery]);

  return (
    <div ref={mediaGalleryRef} className="media-gallery-container">
      <div className="media-images-container">
        {files.map((file, index) => (
          <div className="media-image" key={index}>
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
