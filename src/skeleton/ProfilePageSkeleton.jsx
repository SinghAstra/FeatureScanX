import "../styles/ProfilePageSkeleton.css";

const ProfilePageSkelton = () => {
  return (
    <div className="profile-page-skeleton">
      <div className="profile-header-skeleton">
        <div className="profile-picture-skeleton"></div>
        <div className="profile-info-skeleton">
          <div className="profile-username-skeleton"></div>
          <div className="profile-stats-skeleton"></div>
        </div>
      </div>
      <div className="profile-navigation-skeleton"></div>
    </div>
  );
};

export default ProfilePageSkelton;
