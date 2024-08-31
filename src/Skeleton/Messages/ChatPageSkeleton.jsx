import "../../styles/Skeleton/Messages/ChatPageSkeleton.css";

const ChatPageSkeleton = () => {
  return (
    <div className="chat-page">
      <div className="chat-header">
        <div className="avatar-skeleton skeleton"></div>
        <span className="username-skeleton skeleton"></span>
      </div>
      <div className="chat-section"></div>
    </div>
  );
};

export default ChatPageSkeleton;
