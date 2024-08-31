import { Outlet } from "react-router-dom";
import MessageList from "../components/Messages/MessageList";
import "../styles/Messages/MessagePage.css";

const MessagePage = () => {
  return (
    <div className="messages-page-container">
      <MessageList />
      <Outlet />
    </div>
  );
};

export default MessagePage;
