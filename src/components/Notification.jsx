import PropTypes from "prop-types";
import "../styles/Notification.css";

const Notification = ({ message }) => {
  return (
    <div className="notification">
      <span>{message}</span>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Notification;
