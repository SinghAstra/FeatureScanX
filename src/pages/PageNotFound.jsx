import useTitle from "../hooks/useTitle";

const PageNotFound = () => {
  useTitle("404 Page Not Found • Social UI");

  return (
    <div className="placeholder">
      <h1>404</h1>
      <p>Page Not Found</p>
    </div>
  );
};

export default PageNotFound;
