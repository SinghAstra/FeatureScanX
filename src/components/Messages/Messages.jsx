import axios from "axios";
import { useEffect, useState } from "react";

const Messages = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/messages/${chatId}`, {
          withCredentials: true,
        });
        setMessages(response.data.messages);
      } catch (error) {
        console.log("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    if (chatId) {
      fetchMessages();
    }
  }, [chatId, apiUrl]);

  if (loading) {
    return <div>Loading messages...</div>;
  }

  if (messages.length === 0) {
    return;
  }

  return (
    <div className="messages">
      {messages.map((message) => (
        <div key={message._id} className="message">
          <div className="message-header">
            {/* <img
              src={message.sender.profilePicture || "/default-avatar.png"}
              alt={message.sender.fullName}
              className="avatar"
            /> */}
            <span className="sender-name">{message.sender.fullName}</span>
          </div>
          <p className="message-content">{message.content}</p>
          <small className="message-timestamp">
            {new Date(message.createdAt).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
};

export default Messages;
