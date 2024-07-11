import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import "../styles/CreatePostDialog.css";
import DiscardDialog from "./DiscardDialog";
import ImagePreviewView from "./ImagePreviewView";
import InitialView from "./InitialView";

const CreatePostDialog = ({ isOpen, onClose }) => {
  const dialogRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDiscardDialogOpen, setIsDiscardDialogOpen] = useState(false);

  useEffect(() => {
    let timeoutId;

    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        if (selectedFile) {
          setIsDiscardDialogOpen(true);
        } else {
          onClose();
        }
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
  }, [isOpen, onClose, selectedFile]);

  const handleDiscard = () => {
    setIsDiscardDialogOpen(false);
    onClose();
    setSelectedFile(null);
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
      {isDiscardDialogOpen && (
        <DiscardDialog onDiscard={handleDiscard} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default CreatePostDialog;
