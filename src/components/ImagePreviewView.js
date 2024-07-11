import { faArrowLeft, faCrop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import "../styles/ImagePreviewView.css";
import CropOptions from "./CropOptions";

const ImagePreviewView = ({ file, onBack, onNext }) => {
  const [showCropOptions, setShowCropOptions] = useState(false);
  const [cropOption, setCropOption] = useState("original");
  const cropOptionsRef = useRef(null);

  const handleCropButtonClick = () => {
    setShowCropOptions(!showCropOptions);
  };

  const handleOptionClick = (option) => {
    console.log("Selected Crop Option:", option);
    setCropOption(option);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cropOptionsRef.current &&
        !cropOptionsRef.current.contains(event.target)
      ) {
        setShowCropOptions(false);
      }
    };

    if (showCropOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCropOptions]);

  return (
    <>
      <div className="image-preview-dialog-header">
        <FontAwesomeIcon icon={faArrowLeft} onClick={onBack} />
        <h2>Crop</h2>
        <button onClick={onNext}>Next</button>
      </div>
      <div className={`image-preview-dialog-content crop-${cropOption}`}>
        <div
          className="image-container"
          style={{
            backgroundImage: `url(${file})`,
          }}
        ></div>
        <div className="crop-button-container">
          <div ref={cropOptionsRef}>
            <CropOptions
              showCropOptions={showCropOptions}
              onOptionClick={handleOptionClick}
              selectedOption={cropOption}
            />
          </div>
          <div onClick={handleCropButtonClick} className="crop-button">
            <FontAwesomeIcon icon={faCrop} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImagePreviewView;
