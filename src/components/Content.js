import React from "react";
import "../styles/Content.css";
import Posts from "./Posts";
import Suggestions from "./Suggestions";

const Content = () => {
  return (
    <div className="content">
      <Posts />
      <Suggestions />
    </div>
  );
};

export default Content;
