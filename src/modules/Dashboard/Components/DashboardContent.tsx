import React from "react";
import { Outlet } from "react-router-dom";

const DashboardContent = () => {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        <Outlet />
      </div>
    </main>
  );
};

export default DashboardContent;

