import { faArrowLeft, faCrop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { RiZoomInLine } from "react-icons/ri";
import "../styles/ImagePreviewView.css";
import CropOptions from "./CropOptions";
import ZoomSlider from "./ZoomSlider";

const ImagePreviewView = ({ file, onBack, onNext }) => {
  const [showCropOptions, setShowCropOptions] = useState(false);
  const [cropOption, setCropOption] = useState("original");
  const [showZoomSlider, setShowZoomSlider] = useState(false);
  const [zoomValue, setZoomValue] = useState(0);
  const zoomSliderRef = useRef(null);
  const imageContainerRef = useRef(null);

  const handleCropButtonClick = () => {
    setShowCropOptions(!showCropOptions);
  };

  const handleZoomButtonClick = () => {
    setShowZoomSlider(!showZoomSlider);
  };

  const handleZoomChange = (event) => {
    setZoomValue(event.target.value);
    const percentage =
      ((event.target.value - event.target.min) /
        (event.target.max - event.target.min)) *
      100;
    zoomSliderRef.current.style.background = `linear-gradient(to right, white ${percentage}%, black ${percentage}%)`;
    const scale = 1 + event.target.value / 100;
    imageContainerRef.current.style.transform = `scale(${scale})`;
  };

  const handleOptionClick = (option) => {
    setCropOption(option);
  };

  return (
    <>
      <div className="image-preview-dialog-header">
        <FontAwesomeIcon icon={faArrowLeft} onClick={onBack} />
        <h2>Crop</h2>
        <button onClick={onNext}>Next</button>
      </div>
      <div className="image-preview-dialog-content">
        <div className={`image-wrapper crop-${cropOption}`}>
          <div
            className="image-container"
            ref={imageContainerRef}
            style={{
              backgroundImage: `url(${file})`,
            }}
          ></div>
        </div>

        <div className="crop-button-container">
          <CropOptions
            showCropOptions={showCropOptions}
            onOptionClick={handleOptionClick}
            selectedOption={cropOption}
            setShowCropOptions={setShowCropOptions}
          />
          <div onClick={handleCropButtonClick} className="crop-button">
            <FontAwesomeIcon icon={faCrop} />
          </div>
        </div>
        <div className="zoom-button-container">
          <ZoomSlider
            showZoomSlider={showZoomSlider}
            setShowZoomSlider={setShowZoomSlider}
            zoomValue={zoomValue}
            handleZoomChange={handleZoomChange}
            zoomSliderRef={zoomSliderRef}
          />
          <div onClick={handleZoomButtonClick} className="zoom-button">
            <RiZoomInLine
              style={{
                width: "32px",
                height: "32px",
                padding: "5px",
                fill: "white",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImagePreviewView;
