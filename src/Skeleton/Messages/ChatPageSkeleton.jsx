import "../../styles/Skeleton/Messages/ChatPageSkeleton.css";

const ChatPageSkeleton = () => {
  return (
    <div className="chat-page">
      <div className="chat-header">
        <div className="avatar-skeleton skeleton"></div>
        <span className="username-skeleton skeleton"></span>
      </div>
      <div className="chat-section">
        <div className="avatar-skeleton skeleton"></div>
        <p className="username-skeleton skeleton"></p>
        <button className="view-replies-skeleton skeleton"></button>
      </div>
    </div>
  );
};

export default ChatPageSkeleton;
