import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ChatPageSkeleton from "../../Skeleton/Messages/ChatPageSkeleton";
import "../../styles/Messages/ChatPage.css";

const ChatPage = () => {
  const { chatSlug } = useParams();
  const [chat, setChat] = useState(null);
  const [loadingChat, setLoadingChat] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const receiverName = chatSlug.substring(1);

    const accessChat = async () => {
      try {
        const response = await axios.post(
          `${apiUrl}/api/chat/@${receiverName}`,
          {},
          {
            withCredentials: true,
          }
        );
        setChat(response.data);
        console.log("response.data --accessChat is ", response.data);
      } catch (error) {
        console.log("error --accessChat is ", error);
      } finally {
        setLoadingChat(false);
      }
    };

    accessChat();
  }, [apiUrl, chatSlug]);

  if (loadingChat) {
    return <ChatPageSkeleton />;
  }

  if (!chat) {
    return <div>No chat found.</div>;
  }

  return (
    <div className="chat-page">
      <Link to={`/${chat.receiver.userName}`} className="chat-header">
        <div className="avatar">{chat.receiver.fullName[0]}</div>
        <span className="username">{chat.receiver.fullName}</span>
      </Link>
      <div className="chat-section">
        <div className="avatar">{chat.receiver.fullName[0]}</div>
        <p className="username">{chat.receiver.userName}</p>
        <Link to={`/${chat.receiver.userName}`} className="view-replies">
          View Profile
        </Link>
        <h1>Message</h1>
        <h1>Message</h1>
        <h1>Message</h1>
        <h1>Message</h1>
        <h1>Message</h1>
        <h1>Message</h1>
        <h1>Message</h1>
        <h1>Message</h1>
        <h1>Message</h1>
        <h1>Message</h1>
        <h1>Message</h1>
        <h1>Message</h1>
        <h1>Message</h1>
        <h1>Message</h1>
        <h1>Message</h1>
        <h1>Message</h1>
        <h1>Message</h1>
        <h1>Message</h1>
        <h1>Message</h1>
      </div>
    </div>
  );
};

export default ChatPage;
