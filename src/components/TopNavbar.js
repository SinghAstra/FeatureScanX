import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../styles/TopNavbar.css";
import Searchbar from "./Searchbar";

const TopNavbar = () => {
  return (
    <div className="top-navbar">
      <h1>Social</h1>
      <div className="top-navbar-search">
        <Searchbar />
        <FontAwesomeIcon icon={faBell} />
      </div>
    </div>
  );
};

export default TopNavbar;
