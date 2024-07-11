import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { IoIosSquareOutline } from "react-icons/io";
import { LuRectangleHorizontal, LuRectangleVertical } from "react-icons/lu";
import "../styles/CropOptions.css";
const CropOptions = ({ showCropOptions, onOptionClick, selectedOption }) => {
  return (
    <div className={`crop-options ${showCropOptions ? "show" : ""}`}>
      <ul>
        <li
          onClick={() => onOptionClick("original")}
          className={selectedOption === "original" ? "selected" : ""}
        >
          Original
          <FontAwesomeIcon icon={faImage} />
        </li>
        <hr />
        <li
          onClick={() => onOptionClick("1-1")}
          className={selectedOption === "1-1" ? "selected" : ""}
        >
          1:1 <IoIosSquareOutline style={{ fill: "white" }} />
        </li>
        <hr />
        <li
          onClick={() => onOptionClick("4-5")}
          className={selectedOption === "4-5" ? "selected" : ""}
        >
          4:5 <LuRectangleVertical />
        </li>
        <hr />
        <li
          onClick={() => onOptionClick("16-9")}
          className={selectedOption === "16-9" ? "selected" : ""}
        >
          16:9 <LuRectangleHorizontal />
        </li>
      </ul>
    </div>
  );
};

export default CropOptions;
