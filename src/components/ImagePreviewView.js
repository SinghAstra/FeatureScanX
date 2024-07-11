import { faArrowLeft, faCrop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../styles/ImagePreviewView.css";
import CropOptions from "./CropOptions";

const ImagePreviewView = ({ file, onBack, onNext }) => {
  const [showCropOptions, setShowCropOptions] = useState(false);

  const handleCropButtonClick = () => {
    setShowCropOptions(!showCropOptions);
  };

  const handleOptionClick = (option) => {
    console.log("Selected Crop Option:", option);
    setShowCropOptions(false);
  };
  return (
    <>
      <div className="image-preview-dialog-header">
        <FontAwesomeIcon icon={faArrowLeft} onClick={onBack} />
        <h2>Crop</h2>
        <button onClick={onNext}>Next</button>
      </div>
      <div className="image-preview-dialog-content">
        <img src={file} alt="Selected" className="selected-image" />
        <div className="crop-button-container">
          {showCropOptions && <CropOptions onOptionClick={handleOptionClick} />}
          <div onClick={handleCropButtonClick} className="crop-button">
            <FontAwesomeIcon icon={faCrop} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImagePreviewView;
