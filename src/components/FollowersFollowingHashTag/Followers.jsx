import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import FollowersFollowingSkeleton from "../../Skeleton/FollowersFollowingSkeleton";
import EmptyFollowers from "../../placeholders/FollowersFollowingHashtag/EmptyFollowers";
import "../../styles/Followers.css";
import UserItem from "./UserItem";

const Followers = ({ username, setShowFFHModal }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loadingFollowers, setLoadingFollowers] = useState(true);
  const [followers, setFollowers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  const fetchFollowers = async (page) => {
    try {
      setLoadingFollowers(true);

      const response = await axios.get(
        `${apiUrl}/api/users/${username}/followers?page=${page}&limit=10`,
        { withCredentials: true }
      );

      setFollowers((prevFollowers) => [
        ...prevFollowers,
        ...response.data.followers,
      ]);

      if (page >= response.data.totalPages) {
        setHasMore(false);
      }

      console.log("response.data --fetchFollowers is ", response.data);
    } catch (error) {
      setFollowers([]);
      console.log("error.message --fetchFollowers is ", error.message);
    } finally {
      setLoadingFollowers(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingFollowers) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    const currentObserver = observerRef.current;
    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
    };
  }, [hasMore, loadingFollowers]);

  useEffect(() => {
    fetchFollowers(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, username]);

  if (loadingFollowers && page === 1) {
    return <FollowersFollowingSkeleton />;
  }

  return (
    <div className="followers-container">
      {followers.map((user) => (
        <UserItem
          key={user._id}
          user={user}
          setShowFFHModal={setShowFFHModal}
        />
      ))}

      {!followers.length && <EmptyFollowers username={username} />}

      <div ref={observerRef} className="loading-more-followers">
        {loadingFollowers && (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

Followers.propTypes = {
  username: PropTypes.string.isRequired,
  setShowFFHModal: PropTypes.func.isRequired,
};

export default Followers;
