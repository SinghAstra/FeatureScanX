import React, { useState } from "react";
import "../styles/CreatePostCarousel.css";

const Carousel = ({
  files,
  cropOption,
  zoomValues,
  currentIndex,
  setCurrentIndex,
}) => {
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
      {currentIndex > 0 && (
        <button
          className="carousel-button prev-button"
          onClick={handlePrevClick}
        >
          ❮
        </button>
      )}
      <div className={`carousel-images crop-${cropOption}`}>
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
      </div>
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

export default Carousel;
