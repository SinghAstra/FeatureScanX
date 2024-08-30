import axios from "axios";
import { useEffect, useRef, useState } from "react";
import UserItem from "../components/FollowersFollowingHashTag/UserItem";

let timer;
const MessagePage = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [followers, setFollowers] = useState([]);
  const [loadingFollowers, setLoadingFollowers] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const observerRef = useRef();

  const fetchFollowers = async (page, query) => {
    try {
      setLoadingFollowers(true);

      const response = await axios.get(
        "http://localhost:5000/api/users/johnsmith01/followers",
        { params: { page, search: query, limit: 5 }, withCredentials: true }
      );

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
      console.log("error.message --fetchFollowers  is ", error.message);
    } finally {
      setLoadingFollowers(false);
    }
  };

  useEffect(() => {
    fetchFollowers(page, query);
  }, [page, query]);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setQuery(search);
      setPage(1);
    }, 1000);
  }, [search]);

  useEffect(() => {
    console.log("useEffect triggered");

    const observer = new IntersectionObserver(
      (entries) => {
        // Log the entries from the observer
        console.log("IntersectionObserver entries:", entries);

        if (entries[0].isIntersecting && hasMore && !loadingFollowers) {
          console.log("Element is intersecting, loading more followers...");
          setPage((prevPage) => {
            console.log("Incrementing page:", prevPage + 1);
            return prevPage + 1;
          });
        } else {
          console.log(
            "Element is not intersecting or no more followers to load"
          );
        }
      },
      { threshold: 1 }
    );

    const currentObserver = observerRef.current;

    // Log the current observer reference
    console.log("Current observer ref:", currentObserver);

    if (currentObserver) {
      console.log("Observing current element");
      observer.observe(currentObserver);
    } else {
      console.log("No element to observe");
    }

    return () => {
      if (currentObserver) {
        console.log("Unobserving current element");
        observer.unobserve(currentObserver);
      }
    };
  }, [hasMore, loadingFollowers]);

  return (
    <div className="messages-page-container">
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

      {followers.map((follower) => {
        return <UserItem key={follower._id} user={follower} />;
      })}

      <div ref={observerRef} className="loading-more-followers">
        {loadingFollowers && page !== 1 && (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagePage;
