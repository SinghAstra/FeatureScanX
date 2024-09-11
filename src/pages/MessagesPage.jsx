import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ChatList from "../components/Messages/ChatList";
import { AuthContext } from "../context/AuthContext";
import { socket } from "../index";
import "../styles/Messages/MessagePage.css";

const MessagePage = () => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    socket.emit("new-online-user", currentUser._id);

    socket.on("new-online-user", (onlineUsers) => {
      console.log("Online users:", onlineUsers);
    });

    return () => {
      socket.off("new-online-user");
    };
  }, [currentUser._id]);

  return (
    <div className="messages-page-container">
      <ChatList />
      <Outlet />
    </div>
  );
};

export default MessagePage;
