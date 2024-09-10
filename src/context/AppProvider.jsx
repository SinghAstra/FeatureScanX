import PropTypes from "prop-types";
import { AuthProvider } from "./AuthContext";
import { SocketProvider } from "./SocketContext";
import { ThemeProvider } from "./ThemeContext";
import { ToastProvider } from "./ToastContext";

const AppProvider = ({ children }) => {
  return (
    <SocketProvider>
      <AuthProvider>
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </SocketProvider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
