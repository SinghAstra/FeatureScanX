import {
  faCompass,
  faFilm,
  faHome,
  faPlusCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../styles/BottomNavigation.css";

const BottomNavigation = () => {
  return (
    <div className="bottom-navbar">
      <div className="bottom-navbar-link">
        <FontAwesomeIcon icon={faHome} />
      </div>
      <div className="bottom-navbar-link">
        <FontAwesomeIcon icon={faCompass} />
      </div>
      <div className="bottom-navbar-link">
        <FontAwesomeIcon icon={faFilm} />
      </div>
      <div className="bottom-navbar-link">
        <FontAwesomeIcon icon={faPlusCircle} />
      </div>
      <div className="bottom-navbar-link">
        <FontAwesomeIcon icon={faUser} />
      </div>
    </div>
  );
};

export default BottomNavigation;
