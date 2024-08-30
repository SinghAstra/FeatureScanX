import "../../styles/Search/Recent.css";

const Recent = () => {
  return (
    <div className="recent-interactions-container">
      <div className="header">
        <p>Recent</p>
        <p className="clear-all">Clear All</p>
      </div>
      <div className="work-in-progress">
        <img src="/work-in-progress.png" alt="work-in-progress" />
        <p>Building Recent Section</p>
      </div>
    </div>
  );
};

export default Recent;