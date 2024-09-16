import ChatSectionSkeleton from "./ChatSectionSkeleton";

const ChatPageSkeleton = () => {
  return (
    <div className="chat-page">
      <div className="chat-header">
        <div className="avatar-skeleton skeleton"></div>
        <span className="username-skeleton skeleton"></span>
      </div>
      <ChatSectionSkeleton />
    </div>
  );
};

export default ChatPageSkeleton;
