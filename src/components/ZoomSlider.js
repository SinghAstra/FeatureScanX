import React, { useEffect, useRef } from "react";

const ZoomSlider = ({
  showZoomSlider,
  setShowZoomSlider,
  zoomValues,
  setZoomValues,
  currentIndex,
}) => {
  const zoomSliderContainerRef = useRef(null);
  const zoomSliderRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        zoomSliderContainerRef.current &&
        !zoomSliderContainerRef.current.contains(event.target)
      ) {
        setShowZoomSlider(false);
      }
    };

    if (showZoomSlider) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showZoomSlider, setShowZoomSlider]);

  useEffect(() => {
    const percentage = zoomValues[currentIndex];
    if (zoomSliderRef.current) {
      zoomSliderRef.current.style.background = `linear-gradient(to right, white ${percentage}%, black ${percentage}%)`;
    }
  }, [currentIndex, zoomSliderRef, zoomValues]);

  const handleZoomChange = (event) => {
    const newZoomValue = event.target.value;
    const newZoomValues = [...zoomValues];
    newZoomValues[currentIndex] = newZoomValue;
    setZoomValues(newZoomValues);
  };

  return (
    <div
      className={`zoom-slider-container ${
        showZoomSlider ? "show-zoom-slider" : ""
      }`}
      ref={zoomSliderContainerRef}
    >
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
