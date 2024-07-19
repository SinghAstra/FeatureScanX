import React, { useRef, useState } from "react";
import "../styles/CreatePostCarousel.css";

const CreatePostCarousel = ({
  files,
  cropOption,
  zoomValues,
  currentIndex,
  setCurrentIndex,
}) => {
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const imageContainerRef = useRef(null);
  const imageWrapperRef = useRef(null);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? files.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === files.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel">
      <div className={`carousel-images crop-1-1`}>
        {files.map((file, index) => (
          <div
            key={index}
            className={`carousel-image ${
              index === currentIndex ? "active" : ""
            }`}
            style={{
              backgroundImage: `url(${file})`,
              transform:
                index === currentIndex
                  ? `scale(${zoomValues[currentIndex] / 100 + 1})`
                  : "scale(1)",
            }}
          ></div>
        ))}
        <div className="horizontal-line line1"></div>
        <div className="horizontal-line line2"></div>
        <div className="vertical-line line1"></div>
        <div className="vertical-line line2"></div>
      </div>
      {currentIndex > 0 && (
        <button
          className="carousel-button prev-button"
          onClick={handlePrevClick}
        >
          ❮
        </button>
      )}
      {currentIndex < files.length - 1 && (
        <button
          className="carousel-button next-button"
          onClick={handleNextClick}
        >
          ❯
        </button>
      )}
      {files.length > 1 && (
        <div className="carousel-indicator">
          {files.map((file, index) => (
            <div
              key={index}
              className={`carousel-icon ${
                index === currentIndex ? "active" : ""
              }`}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreatePostCarousel;
