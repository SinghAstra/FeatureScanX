import UserItemSkeleton from "./UserItemSkeleton";

const FollowersFollowingSkeleton = () => {
  return (
    <div className="followers-following-skeleton">
      <div className="search-followers-container">
        <input type="text" className="search-followers" placeholder="Search" />
      </div>
      <UserItemSkeleton />
      <UserItemSkeleton />
      <UserItemSkeleton />
      <UserItemSkeleton />
      <UserItemSkeleton />
      <UserItemSkeleton />
      <UserItemSkeleton />
      <UserItemSkeleton />
      <UserItemSkeleton />
    </div>
  );
};

export default FollowersFollowingSkeleton;
