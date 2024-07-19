import React, { useRef, useState } from "react";
import "./GrabAndDrag.css";

const GrabAndDrag = () => {
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const imageContainerRef = useRef(null);
  const imageWrapperRef = useRef(null);

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
        className={`image-wrapper ${isDragging ? "show-lines" : ""}`}
        ref={imageWrapperRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="image-container"
          ref={imageContainerRef}
          style={{
            transform: `translate(${imagePosition.x}px, ${imagePosition.y}px)`,
            cursor: isDragging ? "grabbing" : "grab",
          }}
        ></div>
        <div className="horizontal-line line1"></div>
        <div className="horizontal-line line2"></div>
        <div className="vertical-line line1"></div>
        <div className="vertical-line line2"></div>
      </div>
    </div>
  );
};

export default GrabAndDrag;
