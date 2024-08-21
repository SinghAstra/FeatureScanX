import PropTypes from "prop-types";
import { useState } from "react";
import "../../styles/MediaSlideShow.css";

const MediaSlideShow = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? media.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === media.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  return (
    <div className="post-media-slider">
      {currentIndex !== 0 && (
        <div onClick={goToPrevious} className="left-arrow">
          ❰
        </div>
      )}
      {currentIndex !== media.length - 1 && (
        <div onClick={goToNext} className="right-arrow">
          ❱
        </div>
      )}
      <div
        className="post-media-slide"
        style={{ backgroundImage: `url(${media[currentIndex].highResUrl})` }}
      ></div>
      {media.length > 1 && (
        <div className="dots-container-nav">
          {media.map((media, mediaIndex) => (
            <div
              className={`dot ${mediaIndex === currentIndex ? "active" : ""}`}
              key={mediaIndex}
              onClick={() => goToSlide(mediaIndex)}
            >
              ●
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

MediaSlideShow.propTypes = {
  media: PropTypes.arrayOf(
    PropTypes.shape({
      lowResUrl: PropTypes.string.isRequired,
      highResUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MediaSlideShow;
