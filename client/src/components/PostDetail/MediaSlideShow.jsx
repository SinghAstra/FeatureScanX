import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const MediaSlideShow = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});

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

  useEffect(() => {
    // Preload high-resolution images
    media.forEach((item, index) => {
      const img = new Image();
      img.src = item.highResUrl;
      img.onload = () =>
        setLoadedImages((prev) => ({ ...prev, [index]: true }));
    });
  }, [media]);

  const currentMedia = media[currentIndex];
  const backgroundStyle = {
    backgroundImage: `url(${
      loadedImages[currentIndex]
        ? currentMedia.highResUrl
        : currentMedia.lowResUrl
    })`,
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
      <div className="post-media-slide" style={backgroundStyle}></div>
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
