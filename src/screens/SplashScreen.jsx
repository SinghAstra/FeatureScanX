import "../styles/SplashScreen.css";

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <div className="logo-container">
        <img src="/social.png" alt="Instagram Logo" className="logo" />
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
