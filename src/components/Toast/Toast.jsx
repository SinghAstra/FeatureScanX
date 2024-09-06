import { useEffect, useState } from "react";
import "../../styles/Toast/Toast.css";

const Toast = () => {
  let type = "info";
  let message = "Operation successful";
  //   const onClose = () => {
  //     console.log("onClose() called");
  //   };

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      //   onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <section className={`toast ${type}`}>
      <div className="icon-wrapper">
        <div className="icon"></div>
      </div>
      <div className="toast-message">
        <h4>{type.charAt(0).toUpperCase() + type.slice(1)}</h4>
        <p>{message}</p>
      </div>
      <button
        className="toast-close"
        onClick={() => {
          setVisible(false);
          //   onClose();
        }}
      ></button>
      <div className="timer timer-animation"></div>
    </section>
  );
};

export default Toast;
