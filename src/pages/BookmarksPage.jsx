import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const BookmarksPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  console.log("theme is ", theme);
  return (
    <div className="placeholder">
      <h1>Bookmarks</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default BookmarksPage;
