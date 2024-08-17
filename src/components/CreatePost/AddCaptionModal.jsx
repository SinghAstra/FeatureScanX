import PropTypes from "prop-types";
import { useState } from "react";
import "../../styles/AddCaptionModal.css";

const AddCaptionModal = ({
  mediaPreview,
  formData,
  handleChange,
  onBack,
  setModalShown,
  onSubmit,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === mediaPreview.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? mediaPreview.length - 1 : prevSlide - 1
    );
  };

  const renderMedia = (file) => {
    if (file.type.startsWith("image")) {
      return <img src={file.url} alt="Media Preview" className="media-slide" />;
    } else if (file.type.startsWith("video")) {
      return (
        <video controls className="media-slide">
          <source src={file.url} type={file.type} />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setModalShown(false)}>
      <div className="add-caption-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span onClick={onBack}>Back</span>
          <h2>Add Caption & Location</h2>
          <span onClick={onSubmit}>Next</span>
        </div>
        <div className="modal-body">
          <div className="media-preview">
            {mediaPreview.length > 0 && (
              <div className="slideshow-container">
                {currentSlide !== 0 && (
                  <button className="prev" onClick={prevSlide}>
                    &#10094;
                  </button>
                )}
                {renderMedia(mediaPreview[currentSlide])}
                {currentSlide !== mediaPreview.length - 1 && (
                  <button className="next" onClick={nextSlide}>
                    &#10095;
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="add-caption-location-section">
            <textarea
              type="text"
              placeholder="Add a caption..."
              value={formData.caption}
              onChange={handleChange}
              name="caption"
            />
            <div className="location-input-container">
              <input
                type="text"
                placeholder="Add a location..."
                value={formData.location}
                onChange={handleChange}
                name="location"
              />
              <i className="uil uil-map-marker icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AddCaptionModal.propTypes = {
  mediaPreview: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  formData: PropTypes.shape({
    caption: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  setModalShown: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddCaptionModal;
