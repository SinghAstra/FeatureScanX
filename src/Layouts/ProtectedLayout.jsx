import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/ProtectedLayout.css";

const ProtectedLayout = () => {
  return (
    <div className="protected-layout">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
