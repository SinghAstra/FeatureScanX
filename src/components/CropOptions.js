import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { IoIosSquareOutline } from "react-icons/io";
import { LuRectangleHorizontal, LuRectangleVertical } from "react-icons/lu";
import "../styles/CropOptions.css";
const CropOptions = ({ onOptionClick }) => {
  return (
    <div className="crop-options">
      <ul>
        <li onClick={() => onOptionClick("original")}>
          Original
          <FontAwesomeIcon icon={faImage} />
        </li>
        <hr />
        <li onClick={() => onOptionClick("1-1")}>
          1:1 <IoIosSquareOutline style={{ fill: "white" }} />
        </li>
        <hr />
        <li onClick={() => onOptionClick("4-5")}>
          4:5 <LuRectangleVertical />
        </li>
        <hr />
        <li onClick={() => onOptionClick("16-9")}>
          16:9 <LuRectangleHorizontal />
        </li>
      </ul>
    </div>
  );
};

export default CropOptions;
