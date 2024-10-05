import React, { useState } from "react";
import Sidebar from "./Components/Sidebar";
import DashboardContent from "./Components/DashboardContent";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <DashboardContent />
      </div>
    </>
  );
};

export default Dashboard;
