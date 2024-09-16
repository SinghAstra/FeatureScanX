import PropTypes from "prop-types";
import { useState } from "react";

const MediaPreviewSlide = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="media-preview-slider">
      {currentIndex !== 0 && (
        <div onClick={goToPrevious} className="left-arrow">
          ❰
        </div>
      )}
      {currentIndex !== slides.length - 1 && (
        <div onClick={goToNext} className="right-arrow">
          ❱
        </div>
      )}
      {/* <div
        style={{
          backgroundImage: `url(${slides[currentIndex].url})`,
        }}
        className="media-preview-slide"
      ></div> */}
      {slides[currentIndex].type.includes("image") ? (
        <div
          style={{
            backgroundImage: `url(${slides[currentIndex].url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
          }}
          className="media-preview-slide"
        ></div>
      ) : (
        <video controls style={{ maxWidth: "100%", height: "auto" }}>
          <source
            src={slides[currentIndex].url}
            type={slides[currentIndex].type}
          />
          Your browser does not support the video tag.
        </video>
      )}
      {slides.length > 1 && (
        <div className="dots-container-nav">
          {slides.map((slide, slideIndex) => (
            <div
              className={`dot ${slideIndex === currentIndex ? "active" : ""}`}
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
            >
              ●
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

MediaPreviewSlide.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired
  ),
};

export default MediaPreviewSlide;
