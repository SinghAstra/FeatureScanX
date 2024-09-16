import RecommendUsers from "../components/Home/RecommendUsers";
import Search from "../components/Search/Search";

const SearchPage = () => {
  return (
    <div className="search-page">
      <Search />
      <RecommendUsers />
    </div>
  );
};

export default SearchPage;
