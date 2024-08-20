import PropTypes from "prop-types";
import { useState } from "react";

const ProgressiveImage = ({ lowResUrl, highResUrl, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <img
        src={lowResUrl}
        alt={alt}
        style={{
          filter: "blur(20px)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          transition: "opacity 0.5s ease-in-out",
          opacity: isLoaded ? 0 : 1,
        }}
      />
      <img
        src={highResUrl}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          objectFit: "cover",
          width: "100%",
          height: "100%",
          transition: "opacity 0.5s ease-in-out",
          opacity: isLoaded ? 1 : 0,
        }}
      />
    </div>
  );
};

ProgressiveImage.propTypes = {
  lowResUrl: PropTypes.string.isRequired,
  highResUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ProgressiveImage;
