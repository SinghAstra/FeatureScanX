import React, { useEffect, useRef } from "react";

const ZoomSlider = ({
  showZoomSlider,
  setShowZoomSlider,
  zoomValue,
  handleZoomChange,
  zoomSliderRef,
}) => {
  const zoomSliderContainerRef = useRef(null);

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
        value={zoomValue}
        onChange={handleZoomChange}
        className="zoom-slider"
        ref={zoomSliderRef}
      />
    </div>
  );
};

export default ZoomSlider;
