import {
  faArrowLeft,
  faCrop,
  faSearchPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { GoListOrdered } from "react-icons/go";
import "../styles/ImagePreviewView.css";
import CreatePostCarousel from "./CreatePostCarousel";
import CropOptions from "./CropOptions";
import ZoomSlider from "./ZoomSlider";

const ImagePreviewView = ({ files, onBack, onNext }) => {
  const [showCropOptions, setShowCropOptions] = useState(false);
  const [cropOption, setCropOption] = useState("original");
  const [showZoomSlider, setShowZoomSlider] = useState(false);
  const [zoomValues, setZoomValues] = useState(Array(files.length).fill(0));
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log("zoomValues is ", zoomValues);

  const handleCropButtonClick = () => {
    setShowCropOptions(!showCropOptions);
  };

  const handleZoomButtonClick = () => {
    setShowZoomSlider(!showZoomSlider);
  };

  const handleZoomChange = (event) => {
    const newZoomValue = event.target.value;
    const newZoomValues = [...zoomValues];
    newZoomValues[currentIndex] = newZoomValue;
    setZoomValues(newZoomValues);
  };

  const handleOptionClick = (option) => {
    setCropOption(option);
  };

  const handleMediaGalleryClick = () => {};

  return (
    <>
      <div className="image-preview-dialog-header">
        <FontAwesomeIcon icon={faArrowLeft} onClick={onBack} />
        <h2>Crop</h2>
        <button onClick={onNext}>Next</button>
      </div>
      <div className="image-preview-dialog-content">
        <CreatePostCarousel
          files={files}
          cropOption={cropOption}
          zoomValues={zoomValues}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <div className="crop-button-container">
          <CropOptions
            showCropOptions={showCropOptions}
            onOptionClick={handleOptionClick}
            selectedOption={cropOption}
            setShowCropOptions={setShowCropOptions}
          />
          <div className="crop-button">
            <FontAwesomeIcon icon={faCrop} onClick={handleCropButtonClick} />
          </div>
        </div>
        <div className="zoom-button-container">
          <ZoomSlider
            showZoomSlider={showZoomSlider}
            setShowZoomSlider={setShowZoomSlider}
            zoomValue={zoomValues[currentIndex]}
            handleZoomChange={handleZoomChange}
          />
          <div className="zoom-button">
            <FontAwesomeIcon
              icon={faSearchPlus}
              onClick={handleZoomButtonClick}
            />
          </div>
        </div>
        <div className="media-gallery-container">
          <div onClick={handleMediaGalleryClick} className="media-gallery">
            <GoListOrdered
              style={{
                width: "36px",
                height: "36px",
                padding: "6px",
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
