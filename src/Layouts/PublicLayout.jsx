// import { useContext } from "react";
import { Outlet } from "react-router-dom";
// import { ThemeContext } from "../context/ThemeContext";

const PublicLayout = () => {
  // const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="public-layout">
      <main>
        <Outlet />
      </main>
      {/* <button className="toggle-theme" onClick={toggleTheme}>
        {theme === "light" ? (
          <i className="uil uil-moon"></i>
        ) : (
          <i className="uil uil-brightness"></i>
        )}
      </button> */}
    </div>
  );
};

export default PublicLayout;
