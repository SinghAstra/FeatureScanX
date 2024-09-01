import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import "../../styles/Messages/Messages.css";

const Messages = ({ chatId }) => {
  const { currentUser } = useContext(AuthContext);
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
    return <div>No messages</div>;
  }

  return (
    <div className="messages">
      {messages.map((message, index) => {
        const isSelfMessage = message.sender._id === currentUser._id;

        const isFirstMessageFromSender =
          index === 0 || messages[index - 1].sender._id !== message.sender._id;
        const isLastMessageFromSender =
          index === messages.length - 1 ||
          messages[index + 1].sender._id !== message.sender._id;

        let messageTypeClass = "";
        if (isFirstMessageFromSender && isLastMessageFromSender) {
          messageTypeClass = "only-message";
        } else if (isFirstMessageFromSender) {
          messageTypeClass = "first-message";
        } else if (isLastMessageFromSender) {
          messageTypeClass = "last-message";
        } else {
          messageTypeClass = "mid-message";
        }

        return (
          <div
            key={message._id}
            className={`message-container ${
              isSelfMessage
                ? "self-message-container"
                : "other-message-container"
            } ${messageTypeClass}`}
          >
            {!isSelfMessage && isLastMessageFromSender && (
              <div className="avatar-container">
                {message.sender.profilePicture ? (
                  <img
                    src={message.sender.profilePicture}
                    className="message-avatar"
                    alt={message.sender.fullName}
                  />
                ) : (
                  <div className="message-avatar">
                    {message.sender.fullName[0]}
                  </div>
                )}
              </div>
            )}

            <div className={isSelfMessage ? "self-message" : "other-message"}>
              <p className="message-content">{message.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
