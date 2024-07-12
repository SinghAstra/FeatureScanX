import React, { useState } from "react";
import "../styles/CreatePostCarousel.css";

const Carousel = ({ files, cropOption }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
      <button className="carousel-button prev-button" onClick={handlePrevClick}>
        ❮
      </button>
      <div className={`carousel-images crop-${cropOption}`}>
        {files.map((file, index) => (
          <div
            key={index}
            className={`carousel-image ${
              index === currentIndex ? "active" : ""
            }`}
            style={{ backgroundImage: `url(${file})` }}
          ></div>
        ))}
      </div>
      <button className="carousel-button next-button" onClick={handleNextClick}>
        ❯
      </button>
    </div>
  );
};

export default Carousel;
