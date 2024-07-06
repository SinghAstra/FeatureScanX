import BottomNavigation from "./components/BottomNavigation";
import Content from "./components/Content";
import FeedSidebar from "./components/FeedSidebar";
import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles/App.css";

function App() {
  return (
    <div className="app-container">
      {/* <TopNavbar />
      <Sidebar />
      <Content />
      <FeedSidebar />
      <BottomNavigation /> */}
      <Register />
    </div>
  );
}

export default App;
