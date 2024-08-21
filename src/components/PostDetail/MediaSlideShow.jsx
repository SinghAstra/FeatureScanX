import { useState } from "react";
import PostImage from "./PostImage";

const MediaSlideShow = ({ media }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === media.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? media.length - 1 : prevSlide - 1
    );
  };
  return (
    <div className="post-slideshow-container">
      <button onClick={prevSlide}>Prev</button>
      {/* <PostImage image={media[currentSlide]} /> */}
      <div className="post-image-slide">First</div>
      <div className="post-image-slide">Second</div>
      <div className="post-image-slide">Third</div>
      <button onClick={nextSlide}>Next</button>
    </div>
  );
};

export default MediaSlideShow;
