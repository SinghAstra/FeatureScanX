import {
  faArrowLeft,
  faArrowsAlt,
  faCrop,
  faSearchPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../styles/ImagePreviewView.css";
import CreatePostCarousel from "./CreatePostCarousel";
import CropOptions from "./CropOptions";
import MediaGallery from "./MediaGallery";
import ZoomSlider from "./ZoomSlider";

const ImagePreviewView = ({ files, onBack, onNext }) => {
  const [showCropOptions, setShowCropOptions] = useState(false);
  const [cropOption, setCropOption] = useState("original");
  const [showZoomSlider, setShowZoomSlider] = useState(false);
  const [zoomValues, setZoomValues] = useState(Array(files.length).fill(0));
  const [showMediaGallery, setShowMediaGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleCropOptions = () => {
    console.log("Inside toggleCropOptions");
    setShowCropOptions(!showCropOptions);
  };

  const toggleZoomSlider = () => {
    setShowZoomSlider(!showZoomSlider);
  };

  const toggleMediaGallery = () => {
    setShowMediaGallery(!showMediaGallery);
  };

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
        <button onClick={toggleCropOptions} className="crop-button">
          <FontAwesomeIcon icon={faCrop} />
        </button>
        {showCropOptions && (
          <CropOptions
            setShowCropOptions={setShowCropOptions}
            setCropOption={setCropOption}
            selectedOption={cropOption}
          />
        )}
        <button className="zoom-button" onClick={toggleZoomSlider}>
          <FontAwesomeIcon icon={faSearchPlus} onClick={toggleZoomSlider} />
        </button>
        {showZoomSlider && (
          <ZoomSlider
            setShowZoomSlider={setShowZoomSlider}
            zoomValues={zoomValues}
            setZoomValues={setZoomValues}
            currentIndex={currentIndex}
          />
        )}
        <button onClick={toggleMediaGallery} className="media-gallery-button">
          <FontAwesomeIcon icon={faArrowsAlt} />
        </button>
        {showMediaGallery && (
          <MediaGallery
            setShowMediaGallery={setShowMediaGallery}
            files={files}
          />
        )}
      </div>
    </>
  );
};

export default ImagePreviewView;
