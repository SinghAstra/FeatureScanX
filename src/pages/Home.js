import React from "react";
import BottomNavigation from "../components/BottomNavigation";
import Content from "../components/Content";
import FeedSidebar from "../components/FeedSidebar";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

const Home = () => {
  return (
    <>
      <TopNavbar />
      <Sidebar />
      <Content />
      <FeedSidebar />
      <BottomNavigation />
    </>
  );
};

export default Home;
