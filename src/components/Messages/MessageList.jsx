import "../../styles/Messages/MessageList.css";

const MessageList = () => {
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
};

export default MessageList;
