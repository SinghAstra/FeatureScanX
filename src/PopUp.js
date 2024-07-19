import React, { useState } from "react";
import "./PopUp.css";

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSecondPopup, setShowSecondPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(!showPopup);
  };

  const handleSecondButtonClick = () => {
    setShowSecondPopup(!showSecondPopup);
  };

  return (
    <div className="container">
      <button className="popup-button" onClick={handleButtonClick}>
        P
      </button>
      <div
        className={`popup ${showPopup ? "visible" : ""}`}
        onMouseLeave={handleButtonClick}
      >
        <div>Option 1</div>
        <div>Option 2</div>
        <div>Option 3</div>
      </div>
      <button
        className="popup-button second-button"
        onClick={handleSecondButtonClick}
      >
        P2
      </button>
      <div className={`popup ${showSecondPopup ? "visible" : ""} second-popup`}>
        <div>Option A</div>
        <div>Option B</div>
        <div>Option C</div>
      </div>
    </div>
  );
};

export default Popup;
