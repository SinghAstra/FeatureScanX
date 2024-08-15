// ProtectedLayout.js
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const ProtectedLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
