import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "../../styles/Search.css";
import UserItem from "./UserItem";

let timer;
const Search = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchUsers = async (query, page) => {
    try {
      if (!query) return;
      setLoading(true);
      const response = await axios.get(`${apiUrl}/api/users/search`, {
        params: {
          search: query,
          page,
        },
        withCredentials: true,
      });

      if (page === 1) {
        setResults(response.data.users);
      } else {
        setResults((results) => [...results, ...response.data.users]);
      }

      if (page >= response.data.totalPages) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      console.log("response.data --fetchUsers is ", response.data);
    } catch (error) {
      console.log("error.message --fetchUsers is ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    setResults([]);
    setPage(1);
  };

  useEffect(() => {
    if (query === "") {
      setResults([]);
      setPage(1);
      setHasMore(false);
    }
    fetchUsers(query, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page]);

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
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    const currentObserver = observerRef.current;
    if (currentObserver) observer.observe(currentObserver);

    return () => {
      if (currentObserver) observer.unobserve(currentObserver);
    };
  }, [hasMore, loading]);

  return (
    <div className="search-container">
      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="clear-search" onClick={handleClearSearch}>
            &times;
          </button>
        )}
      </div>
      <div className="search-result-list">
        {results.length > 0 ? (
          results.map((user) => <UserItem key={user._id} user={user} />)
        ) : (
          <p>No results found</p>
        )}
      </div>
      <div ref={observerRef} className="loading-more-followers">
        {loading && page !== 1 && (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
