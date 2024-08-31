import "../../styles/Messages/MessageListItem.css";

const MessageListItem = ({ chat }) => {
  return (
    <div className="message-list-item">
      {chat.receiver.profilePicture ? (
        <img
          src={chat.receiver.profilePicture}
          className="avatar"
          alt={chat.receiver.userName}
        />
      ) : (
        <div className="avatar">{chat.receiver.fullName[0]}</div>
      )}
    </div>
  );
};

export default MessageListItem;
