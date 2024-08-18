import "../styles/SplashScreen.css";

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <div className="logo-container">
        <div className="logo">
          <img src="/social.png" alt="Social Logo" className="logo" />
        </div>
      </div>
      <div className="footer">
        <p>
          from{" "}
          <a href="https://github.com/SinghAstra" target="blank">
            <strong>SinghAstra</strong>
          </a>
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
