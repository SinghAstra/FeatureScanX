import React, { useEffect, useRef } from "react";
import "../styles/ZoomSlider.css";

const ZoomSlider = ({
  setShowZoomSlider,
  zoomValues,
  setZoomValues,
  currentIndex,
}) => {
  const zoomSliderContainerRef = useRef(null);
  const zoomSliderRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log("inside handleClickOutside");
      if (
        zoomSliderContainerRef.current &&
        !zoomSliderContainerRef.current.contains(event.target)
      ) {
        console.log("object inside handleClickOutside");
        setShowZoomSlider(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowZoomSlider]);

  useEffect(() => {
    const percentage = zoomValues[currentIndex];
    if (zoomSliderRef.current) {
      zoomSliderRef.current.style.background = `linear-gradient(to right, white ${percentage}%, black ${percentage}%)`;
    }
  }, [currentIndex, zoomSliderRef, zoomValues]);

  const handleZoomChange = (event) => {
    const newZoomValue = event.target.value;
    console.log("newZoomValue: " + newZoomValue);
    const newZoomValues = [...zoomValues];
    newZoomValues[currentIndex] = newZoomValue;
    setZoomValues(newZoomValues);
  };

  return (
    <div className="zoom-slider-container" ref={zoomSliderContainerRef}>
      <input
        type="range"
        min="0"
        max="100"
        value={zoomValues[currentIndex]}
        onChange={handleZoomChange}
        className="zoom-slider"
        ref={zoomSliderRef}
      />
    </div>
  );
};

export default ZoomSlider;
