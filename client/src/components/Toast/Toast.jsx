import PropTypes from "prop-types";
import { useEffect } from "react";

const Toast = ({ message, setToast }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(null);
    }, 6000);

    return () => clearTimeout(timer);
  }, [setToast]);

  return (
    <div className="toast">
      <p>{message}</p>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  setToast: PropTypes.func.isRequired,
};

export default Toast;
