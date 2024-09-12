import { GoogleOAuthProvider } from "@react-oauth/google";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { io } from "socket.io-client";
import App from "./App.jsx";
import AppProvider from "./context/AppProvider";
import "./index.css";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const SOCKET_ENDPOINT = import.meta.env.VITE_SOCKET_ENDPOINT;
export const socket = io(SOCKET_ENDPOINT);

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
  </GoogleOAuthProvider>
);
