import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import MessageList from "../components/Messages/MessageList";
import { AuthContext } from "../context/AuthContext";
import { SocketContext } from "../context/SocketContext";
import "../styles/Messages/MessagePage.css";

const MessagePage = () => {
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.emit("addOnlineUser", currentUser._id);
    socket.on("getOnlineUsers", (onlineUsers) => {
      console.log("onlineUsers are", JSON.stringify(onlineUsers));
    });
  }, [currentUser._id, socket]);

  return (
    <div className="messages-page-container">
      <MessageList />
      <Outlet />
    </div>
  );
};

export default MessagePage;
