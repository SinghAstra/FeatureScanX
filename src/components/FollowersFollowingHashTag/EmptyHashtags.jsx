const EmptyHashtags = () => {
  const isCurrentUser = true;
  return (
    <div className="empty-hashtag">
      <div className="icon">
        <img src="/hashing.png" alt="hashing" />
      </div>
      {isCurrentUser ? (
        <p>You&#039;ll see hashtags that you follow here..</p>
      ) : (
        <p>This account follows no hashtag.</p>
      )}
    </div>
  );
};

export default EmptyHashtags;
