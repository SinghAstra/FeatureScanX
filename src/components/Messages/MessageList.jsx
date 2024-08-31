import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/Messages/MessageList.css";
import MessageListItem from "./MessageListItem";

const MessageList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/chat/get-all-user-chats`,
          {
            withCredentials: true,
          }
        );
        setChats(response.data.chats);
        console.log("response.data --fetchChats is ", response.data);
      } catch (error) {
        console.log("error.message --fetchChats is ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="message-list">
        <div className="message-list-header">
          <h2>Messages</h2>
          <p>Requests</p>
        </div>
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="message-list">
        <div className="message-list-header">
          <h2>Messages</h2>
          <p>Requests</p>
        </div>
        <div className="message-empty-list">
          <img src="/chat.png" alt="chat" />
          <p>No messages found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="message-list">
      <div className="message-list-header">
        <h2>Messages</h2>
        <p>Requests</p>
      </div>
      {chats.map((chat) => (
        <MessageListItem key={chat._id} chat={chat} />
      ))}
    </div>
  );
};

export default MessageList;
