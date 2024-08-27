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
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const observerRef = useRef(null);

  const fetchFollowers = async (page, query) => {
    try {
      setLoadingFollowers(true);

      const response = await axios.get(
        `${apiUrl}/api/users/${username}/followers?page=${page}&limit=10&search=${query}`,
        { withCredentials: true }
      );

      // Reset followers on new search query
      if (page === 1) {
        setFollowers(response.data.followers);
      } else {
        setFollowers((prevFollowers) => [
          ...prevFollowers,
          ...response.data.followers,
        ]);
      }

      if (page >= response.data.totalPages) {
        setHasMore(false);
      } else {
        setHasMore(true);
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
    fetchFollowers(page, query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setQuery(search);
      setPage(1);
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  if (loadingFollowers && page === 1 && search === "") {
    return <FollowersFollowingSkeleton />;
  }

  const noFollowers = !search && !loadingFollowers && followers.length === 0;
  const noResultsAfterSearch = search && followers.length === 0;

  if (noFollowers) {
    return <EmptyFollowers username={username} />;
  }

  return (
    <div className="followers-container">
      <div className="search-followers-container">
        <input
          type="text"
          className="search-followers"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="clear-search" onClick={() => setSearch("")}>
            &times;
          </button>
        )}
      </div>
      {noResultsAfterSearch && (
        <div className="no-results">
          No followers found matching &quot;{search}&quot;.
        </div>
      )}
      {followers.map((user) => (
        <UserItem
          key={user._id}
          user={user}
          setShowFFHModal={setShowFFHModal}
        />
      ))}

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
