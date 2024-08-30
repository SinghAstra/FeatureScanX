import "../../styles/Search/UserItem.css";

const UserItem = ({ user }) => {
  return (
    <div className="search-user-item">
      {user.profilePicture ? (
        <img src={user.profilePicture} alt={user.userName} className="avatar" />
      ) : (
        <span className="avatar">{user.fullName[0]}</span>
      )}
      <div className="user-info">
        <span className="username">{user.userName}</span>
        <span className="user-fullName">{user.fullName}</span>
      </div>
    </div>
  );
};

export default UserItem;
