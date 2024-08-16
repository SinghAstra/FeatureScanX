import "../../styles/UserItem.css";

const UserItem = ({ user }) => {
  return (
    <div key={user._id} className="user-item">
      {user.profilePicture ? (
        <img src={user.profilePicture} alt={user.username} className="avatar" />
      ) : (
        <span className="avatar">{user.fullName[0]}</span>
      )}
      <div className="user-info">
        <span className="username">{user.userName}</span>
        <span className="user-fullName">{user.fullName}</span>
      </div>
      <button className="action-button">Follow</button>
    </div>
  );
};

export default UserItem;
