import BottomNavigation from "./components/BottomNavigation";
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";
import "./styles/App.css";

function App() {
  return (
    <div className="app-container">
      <TopNavbar />
      <Sidebar />
      <Content />
      <BottomNavigation />
    </div>
  );
}

export default App;
