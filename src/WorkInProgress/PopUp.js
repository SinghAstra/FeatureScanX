import { faCrop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import CropOptions from "../components/CropOptions";
import "./PopUp.css";

const Popup = () => {
  const [showCropOptions, setShowCropOptions] = useState(false);
  const [cropOption, setCropOption] = useState("original");
  const imageUrls = [
    "https://images.unsplash.com/photo-1721332154191-ba5f1534266e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    "https://media.istockphoto.com/id/1939491798/photo/micro-metal-gear-box-dc-motor-held-in-the-hand-mini-dc-motor-with-single-shaft.webp?b=1&s=170667a&w=0&k=20&c=53iT1FZiEkkR0dbcLEOqm6uaZxA1I-H5WE3jB__ybiU=",
    "https://media.istockphoto.com/id/1939492888/photo/micro-metal-gear-motor-or-small-gear-dc-motor-held-in-the-hand.webp?b=1&s=170667a&w=0&k=20&c=gCvPzrJwOGdTClP6eNEP4RUa5HV5gl3Y3IFbSgjyoXA=",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const imageContainerRef = useRef(null);
  const imageWrapperRef = useRef(null);

  const toggleCropOptions = () => {
    setShowCropOptions(!showCropOptions);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setInitialMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const deltaX = event.clientX - initialMousePosition.x;
      const deltaY = event.clientY - initialMousePosition.y;

      const maxX =
        (imageContainerRef.current.offsetWidth -
          imageWrapperRef.current.offsetWidth) /
        2;
      const maxY =
        (imageContainerRef.current.offsetHeight -
          imageWrapperRef.current.offsetHeight) /
        2;
      const extraSpace = 80;

      setImagePosition((prevImagePosition) => {
        let newX = prevImagePosition.x + deltaX;
        let newY = prevImagePosition.y + deltaY;

        const boundedX = Math.max(
          -maxX - extraSpace,
          Math.min(newX, maxX + extraSpace)
        );
        const boundedY = Math.max(
          -maxY - extraSpace,
          Math.min(newY, maxY + extraSpace)
        );

        return {
          x: boundedX,
          y: boundedY,
        };
      });

      setInitialMousePosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const maxX =
      (imageContainerRef.current.offsetWidth -
        imageWrapperRef.current.offsetWidth) /
      2;
    const maxY =
      (imageContainerRef.current.offsetHeight -
        imageWrapperRef.current.offsetHeight) /
      2;

    setImagePosition((prevImagePosition) => {
      const boundedX = Math.max(-maxX, Math.min(prevImagePosition.x, maxX));
      const boundedY = Math.max(-maxY, Math.min(prevImagePosition.y, maxY));
      return {
        x: boundedX,
        y: boundedY,
      };
    });
  };

  return (
    <div className="container">
      <div
        className="carousel"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className={`carousel-images-container crop-${cropOption}`}
          ref={imageWrapperRef}
        >
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className={`carousel-image ${
                index === currentIndex ? "active" : ""
              }`}
              style={{
                backgroundImage: `url(${url})`,
                // transform: `translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                transform: "translate(0px,0px)",
                cursor: isDragging ? "grabbing" : "grab",
              }}
              ref={imageContainerRef}
            ></div>
          ))}
        </div>
        {currentIndex > 0 && (
          <button
            className="carousel-button prev-button"
            onClick={handlePrevClick}
          >
            ❮
          </button>
        )}
        {currentIndex < imageUrls.length - 1 && (
          <button
            className="carousel-button next-button"
            onClick={handleNextClick}
          >
            ❯
          </button>
        )}
      </div>
      <button onClick={toggleCropOptions} className="crop-button">
        <FontAwesomeIcon icon={faCrop} />
      </button>
      <CropOptions
        showCropOptions={showCropOptions}
        setShowCropOptions={setShowCropOptions}
        selectedOption={cropOption}
        setCropOption={setCropOption}
      />
    </div>
  );
};

export default Popup;
