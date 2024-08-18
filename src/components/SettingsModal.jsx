import PropTypes from "prop-types";
import "../styles/SettingsModal.css";

const SettingsModal = ({ setModalShown }) => {
  return (
    <div className="modal-backdrop" onClick={() => setModalShown(false)}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Settings</h2>
        </div>
        <div className="settings-item">
          <h3>Switch Appearance</h3>
          <button className="switch-theme-button"></button>
        </div>
      </div>
    </div>
  );
};

SettingsModal.propTypes = {
  setModalShown: PropTypes.func.isRequired,
};

export default SettingsModal;
