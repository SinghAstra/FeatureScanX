import axios from "axios";
import { useEffect, useState } from "react";
import { socket } from "../../index";
import ChatListItem from "./ChatListItem";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

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

  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl]);

  useEffect(() => {
    if (socket) {
      const handleNewMessage = (newMessage) => {
        setChats((prevChats) => {
          const chatExists = prevChats.some(
            (chat) => chat._id === newMessage.chat
          );
          console.log("handleNewMessage in ChatList");

          if (chatExists) {
            return prevChats.map((chat) =>
              chat._id === newMessage.chat
                ? { ...chat, lastMessage: newMessage }
                : chat
            );
          } else {
            console.log("in fetchChats...");
            fetchChats();
            return prevChats;
          }
        });
      };

      socket.on("new-message", handleNewMessage);

      return () => {
        socket.off("new-message", handleNewMessage);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
