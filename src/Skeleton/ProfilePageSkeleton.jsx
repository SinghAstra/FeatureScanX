import "../styles/ProfilePageSkeleton.css";

const ProfilePageSkelton = () => {
  return (
    <div className="profile-page-skeleton">
      <div className="profile-header-skeleton">
        <div className="profile-picture-skeleton skeleton"></div>
        <div className="profile-info-skeleton">
          <div className="profile-username-skeleton skeleton"></div>
          <div className="profile-stats-skeleton skeleton"></div>
          <div className="profile-bio-skeleton skeleton"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageSkelton;