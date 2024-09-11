import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/Messages/ChatList.css";
import ChatListItem from "./ChatListItem";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/chat/chatList`, {
          withCredentials: true,
        });
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
      <div className="chat-list">
        <div className="chat-list-header">
          <h2>Messages</h2>
          {/* <p>Requests</p> */}
        </div>
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="chat-list">
        <div className="chat-list-header">
          <h2>Messages</h2>
          {/* <p>Requests</p> */}
        </div>
        <div className="chat-empty-list">
          <img src="/chat.png" alt="chat" />
          <p>No messages found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h2>Messages</h2>
        {/* <p>Requests</p> */}
      </div>
      <div className="chat-list-content">
        {chats.map((chat) => (
          <ChatListItem key={chat._id} chat={chat} />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
