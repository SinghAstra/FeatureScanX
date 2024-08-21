import "../styles/UserItemSkeleton.css";

const UserItem = () => {
  return (
    <div className="user-item-skeleton">
      <div className="user-avatar-skeleton skeleton"></div>
      <div className="user-info-skeleton">
        <span className="username-skeleton skeleton"></span>
        <span className="user-fullName-skeleton skeleton"></span>
      </div>
    </div>
  );
};

export default UserItem;
