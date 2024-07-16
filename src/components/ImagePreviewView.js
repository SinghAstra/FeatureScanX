import {
  faArrowLeft,
  faCrop,
  faSearchPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { GoListOrdered } from "react-icons/go";
import { RiZoomInLine } from "react-icons/ri";
import "../styles/ImagePreviewView.css";
import CreatePostCarousel from "./CreatePostCarousel";
import CropOptions from "./CropOptions";
import ZoomSlider from "./ZoomSlider";

const ImagePreviewView = ({ files, onBack, onNext }) => {
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

  const handleMediaGalleryClick = () => {};

  return (
    <>
      <div className="image-preview-dialog-header">
        <FontAwesomeIcon icon={faArrowLeft} onClick={onBack} />
        <h2>Crop</h2>
        <button onClick={onNext}>Next</button>
      </div>
      <div className="image-preview-dialog-content">
        <CreatePostCarousel files={files} cropOption={cropOption} />
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
            zoomValue={zoomValue}
            handleZoomChange={handleZoomChange}
            zoomSliderRef={zoomSliderRef}
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
