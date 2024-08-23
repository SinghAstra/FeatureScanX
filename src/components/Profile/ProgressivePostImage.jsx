import PropTypes from "prop-types";
import { useState } from "react";
import "../../styles/ProgressivePostImage.css";

const ProgressivePostImage = ({
  lowResUrl,
  highResUrl,
  alt,
  likes,
  comments,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="progressive-post-image"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={lowResUrl}
        alt={alt}
        className="low-res-image"
        style={{ opacity: isLoaded ? 0 : 1 }}
      />
      <img
        src={highResUrl}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className="high-res-image"
        style={{
          opacity: isLoaded ? 1 : 0,
        }}
      />
      {isHovered && (
        <div className="overlay">
          <span className="likes">
            <i className="uil uil-heart"></i> {likes}
          </span>
          <span className="comments">
            <i className="uil uil-comment"></i> {comments}
          </span>
        </div>
      )}
    </div>
  );
};

ProgressivePostImage.propTypes = {
  lowResUrl: PropTypes.string.isRequired,
  highResUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
};

export default ProgressivePostImage;
