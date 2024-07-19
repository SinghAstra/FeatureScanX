import {
  faAdd,
  faArrowLeft,
  faArrowsAlt,
  faCrop,
  faSearchPlus,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { GoListOrdered } from "react-icons/go";
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
        <CropOptions
          showCropOptions={showCropOptions}
          setShowCropOptions={setShowCropOptions}
          setCropOption={setCropOption}
          selectedOption={cropOption}
        />
        <button className="zoom-button" onClick={toggleZoomSlider}>
          <FontAwesomeIcon icon={faSearchPlus} onClick={toggleZoomSlider} />
        </button>
        <ZoomSlider
          showZoomSlider={showZoomSlider}
          setShowZoomSlider={setShowZoomSlider}
          zoomValues={zoomValues}
          setZoomValues={setZoomValues}
          currentIndex={currentIndex}
        />
        <button onClick={toggleMediaGallery} className="media-gallery-button">
          <FontAwesomeIcon icon={faArrowsAlt} />
        </button>
        <MediaGallery
          showMediaGallery={showMediaGallery}
          setShowMediaGallery={setShowMediaGallery}
          files={files}
        />
      </div>
    </>
  );
};

export default ImagePreviewView;
