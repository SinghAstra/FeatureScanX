import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const SettingsModal = ({ setModalShown }) => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <div className="modal-backdrop" onClick={() => setModalShown(false)}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Settings</h2>
        </div>
        <div className="settings-item">
          <h3>Switch Appearance</h3>
          <input type="checkbox" id="switch-theme" onClick={toggleTheme} />
          <label htmlFor="switch-theme" className="switch-theme-label">
            Toggle
          </label>
        </div>
      </div>
    </div>
  );
};

SettingsModal.propTypes = {
  setModalShown: PropTypes.func.isRequired,
};

export default SettingsModal;
