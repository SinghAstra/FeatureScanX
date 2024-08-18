import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/SettingsModal.css";

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
          <input type="checkbox" id="switch-theme" />
          <label htmlFor="switch-theme">Toggle</label>
        </div>
      </div>
    </div>
  );
};

SettingsModal.propTypes = {
  setModalShown: PropTypes.func.isRequired,
};

export default SettingsModal;
