import "../../styles/Search.css";

const Search = () => {
  return (
    <div className="search-container">
      <input type="text" className="search-input" placeholder="Search" />
      <button className="search-button">
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default Search;
