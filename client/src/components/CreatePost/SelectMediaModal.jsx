import PropTypes from "prop-types";
import { useRef } from "react";

const SelectMediaModal = ({ handleMediaChange, onNext, setModalShown }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    handleMediaChange(e.target.files);
    onNext();
  };

  return (
    <div className="modal-backdrop" onClick={() => setModalShown(false)}>
      <div className="select-media-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Select Media</h2>
        </div>
        <img src="/gallery.png" alt="create new post" />
        <h1>Drag photos And videos here</h1>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
        />
        <button
          className="select-from-computer"
          onClick={() => fileInputRef.current.click()}
        >
          Select from computer
        </button>
      </div>
    </div>
  );
};

SelectMediaModal.propTypes = {
  handleMediaChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  setModalShown: PropTypes.func.isRequired,
};

export default SelectMediaModal;
