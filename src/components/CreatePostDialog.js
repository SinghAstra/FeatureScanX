import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import "../styles/CreatePostDialog.css";
import ImagePreviewView from "./ImagePreviewView";
import InitialView from "./InitialView";

const CreatePostDialog = ({ isOpen, onClose }) => {
  const dialogRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    let timeoutId;

    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100); // Add a small delay to avoid immediate close
    }

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="close-icon">
        <FontAwesomeIcon icon={faClose} />
      </div>
      <div className="dialog" ref={dialogRef}>
        {selectedFile ? (
          <ImagePreviewView
            file={selectedFile}
            onBack={() => setSelectedFile(null)}
            onNext={() =>
              console.log("Proceed to next step with file:", selectedFile)
            }
          />
        ) : (
          <InitialView onSelectFile={(file) => setSelectedFile(file)} />
        )}
      </div>
    </div>
  );
};

export default CreatePostDialog;
