import { useContext, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";
import MessageList from "../components/Messages/MessageList";
import AuthContext from "../context/AuthContext";
import "../styles/Messages/MessagePage.css";

const MessagePage = () => {
  const socket = useRef(null);
  const SOCKET_ENDPOINT = import.meta.env.VITE_SOCKET_ENDPOINT;
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    socket.current = io(SOCKET_ENDPOINT);
    socket.current.emit("addOnlineUser", currentUser._id);
    socket.current.on("getOnlineUsers", (onlineUsers) => {
      console.log("onlineUsers are", JSON.stringify(onlineUsers));
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  return (
    <div className="messages-page-container">
      <MessageList />
      <Outlet />
    </div>
  );
};

export default MessagePage;
