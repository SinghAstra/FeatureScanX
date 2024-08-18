import PropTypes from "prop-types";
import { AuthProvider } from "./AuthContext";
import { ThemeProvider } from "./ThemeContext";

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
