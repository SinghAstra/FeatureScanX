import useTitle from "../hooks/useTitle";

const PageNotFound = () => {
  useTitle("404 Page Not Found • Social");

  return (
    <div className="placeholder">
      <h1>404</h1>
      <p>Page Not Found</p>
    </div>
  );
};

export default PageNotFound;
