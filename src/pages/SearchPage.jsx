import RecommendUsers from "../components/Home/RecommendUsers";
import Search from "../components/Search/Search";
import "../styles/SearchPage.css";

const SearchPage = () => {
  return (
    <div className="search-page">
      <Search />
      <RecommendUsers />
    </div>
  );
};

export default SearchPage;
