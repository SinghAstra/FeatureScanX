import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ChatListItem = ({ chat }) => {
  const formatTimeAgo = (messageDate) => {
    const now = new Date();
    const timeDifference = (now - new Date(messageDate)) / 1000; // in seconds

    if (timeDifference < 1) {
      return "Now";
    } else if (timeDifference < 60) {
      return `${Math.floor(timeDifference)}s`; // seconds
    } else if (timeDifference < 3600) {
      return `${Math.floor(timeDifference / 60)}m`; // minutes
    } else if (timeDifference < 86400) {
      return `${Math.floor(timeDifference / 3600)}h`; // hours
    } else if (timeDifference < 604800) {
      return `${Math.floor(timeDifference / 86400)}d`; // days
    } else {
      return `${Math.floor(timeDifference / 604800)}w`; // weeks
    }
  };

  const chatLink = chat.isGroupChat
    ? `/group-chat/${chat._id}`
    : `/chats/@${chat.receiver.userName}`;

  return (
    <NavLink className="message-list-item" to={chatLink}>
      {chat.receiver.profilePicture ? (
        <img
          src={chat.receiver.profilePicture}
          className="avatar"
          alt={chat.receiver.userName}
        />
      ) : (
        <div className="avatar">{chat.receiver.fullName[0]}</div>
      )}
      <div className="message-info">
        <div className="fullName">{chat.receiver.fullName}</div>
        {chat.lastMessage && (
          <div className="lastMessage">{chat.lastMessage.content}</div>
        )}
      </div>
      <div className="created-At">{formatTimeAgo(chat.updatedAt)}</div>
    </NavLink>
  );
};

ChatListItem.propTypes = {
  chat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    isGroupChat: PropTypes.bool.isRequired,
    receiver: PropTypes.shape({
      userName: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      profilePicture: PropTypes.string,
    }).isRequired,
    lastMessage: PropTypes.shape({
      content: PropTypes.string.isRequired,
    }),
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChatListItem;
