import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { socket } from "../../index";
import ChatPageSkeleton from "../../Skeleton/Messages/ChatPageSkeleton";
import ChatSection from "./ChatSection";

const ChatPage = () => {
  const { chatSlug } = useParams();
  const [chat, setChat] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [loadingChat, setLoadingChat] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const receiverName = chatSlug.substring(1);

    const accessChat = async () => {
      try {
        setLoadingChat(true);
        const response = await axios.post(
          `${apiUrl}/api/chat/@${receiverName}`,
          {},
          {
            withCredentials: true,
          }
        );
        setChat(response.data.chat);
        setReceiver(response.data.receiver);
        console.log("response.data --accessChat is ", response.data);
      } catch (error) {
        console.log("error --accessChat is ", error);
      } finally {
        setLoadingChat(false);
      }
    };

    accessChat();
  }, [apiUrl, chatSlug]);

  useEffect(() => {
    if (socket) {
      const handleNewMessage = (newMessage) => {
        console.log("newMessage.chat is ", newMessage.chat);
        console.log("chat._id is ", chat._id);
        if (newMessage.chat === chat?._id) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      };

      socket.on("new-message", handleNewMessage);

      return () => {
        if (socket) {
          socket.off("new-message", handleNewMessage);
        }
      };
    }
  }, [chat?._id]);

  if (loadingChat) {
    return <ChatPageSkeleton />;
  }

  if (!chat) {
    return <div>No chat found.</div>;
  }

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      const response = await axios.post(
        `${apiUrl}/api/messages/`,
        {
          chatId: chat._id,
          content: message,
        },
        {
          withCredentials: true,
        }
      );

      console.log("response.data --handleSendMessage is :", response.data);
      socket.emit("new-message", response.data.message);
      console.log("messages is ", messages);
      setMessage("");
    } catch (error) {
      console.log("error --handleSendMessage is :", error);
    }
  };

  return (
    <div className="chat-page">
      <Link to={`/${receiver.userName}`} className="chat-header">
        <div className="avatar">{receiver.fullName[0]}</div>
        <span className="username">{receiver.fullName}</span>
      </Link>
      <ChatSection
        receiver={receiver}
        chatId={chat._id}
        messages={messages}
        setMessages={setMessages}
      />
      <div className="send-message-section">
        <div className="send-message-input-container">
          <input
            type="text"
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && message.trim()) {
                handleSendMessage();
              }
            }}
          />
          {message.trim() && (
            <button className="send-btn" onClick={handleSendMessage}>
              Send
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
