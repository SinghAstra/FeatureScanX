import React, { useEffect, useRef } from "react";
import "../styles/DiscardDialog.css";

const DiscardDialog = ({ onDiscard, onCancel }) => {
  const dialogRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onCancel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCancel]);
  return (
    <div className="discard-dialog-overlay">
      <div className="discard-dialog" ref={dialogRef}>
        <div className="discard-dialog-header">
          <h2>Discard post?</h2>
          <p>If you leave, your edits won't be saved.</p>
        </div>
        <div className="discard-dialog-actions">
          <button onClick={onDiscard}>Discard</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DiscardDialog;
