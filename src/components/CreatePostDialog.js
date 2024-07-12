import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import "../styles/CreatePostDialog.css";
import DiscardDialog from "./DiscardDialog";
import ImagePreviewView from "./ImagePreviewView";
import InitialView from "./InitialView";

const CreatePostDialog = ({ isOpen, onClose }) => {
  const dialogRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDiscardDialogOpen, setIsDiscardDialogOpen] = useState(false);

  useEffect(() => {
    let timeoutId;

    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        if (selectedFiles.length > 0) {
          setIsDiscardDialogOpen(true);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);
    }

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, selectedFiles]);

  const handleDiscard = () => {
    setIsDiscardDialogOpen(false);
    onClose();
    setSelectedFiles([]);
  };

  const handleCancel = () => {
    setIsDiscardDialogOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="close-icon">
        <FontAwesomeIcon icon={faClose} />
      </div>
      <div className="dialog" ref={dialogRef}>
        {selectedFiles.length > 0 ? (
          <ImagePreviewView
            files={selectedFiles}
            onBack={() => setIsDiscardDialogOpen(true)}
            onNext={() => console.log("Next Button is clicked.")}
          />
        ) : (
          <InitialView onSelectFiles={(files) => setSelectedFiles(files)} />
        )}
      </div>
      {isDiscardDialogOpen && (
        <DiscardDialog onDiscard={handleDiscard} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default CreatePostDialog;
