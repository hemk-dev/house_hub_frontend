import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoMdLogOut, IoMdMenu } from "react-icons/io";
// Define the prop types
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}
const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const [selectedLink, setSelectedLink] = useState("LandingPage");
  const navigate = useNavigate();
  const sidebar = useRef(null);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  const handleLinkClick = (link: string) => {
    setSelectedLink(link);
    navigate(`/dashboard/${link}`);
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <aside
        ref={sidebar}
        className={`absolute text-white left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-red-500 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between  h-16 bg-gray-300 border-b border-gray-200 px-4">
          <Link
            to="/dashboard/landingpage"
            className="text-2xl font-bold text-gray-900 no-underline ml-10 md:ml-0"
            onClick={() => handleLinkClick("landingpage")}
          >
            HouseHub
          </Link>
        </div>
        <div className="md:overflow-y-auto">
          <ul className="py-4 flex justify-between gap-20 flex-col">
            <div>
              <li
                className={`cursor-pointer px-6 py-2 ${
                  selectedLink === "Properties" && "bg-gray-200"
                }`}
                onClick={() => handleLinkClick("properties")}
              >
                Properties
              </li>
              <li
                className={`cursor-pointer px-6 py-2 ${
                  selectedLink === "user" && "bg-gray-200"
                }`}
                onClick={() => handleLinkClick("user")}
              >
                Users
              </li>
            </div>
            <div>
              <li
                className={`cursor-pointer px-6 py-2 ${
                  selectedLink === "Logout" && "bg-gray-200"
                }`}
                onClick={handleLogout}
              >
                <div className="flex items-center absolute bottom-0 py-4">
                  <IoMdLogOut className="w-6 h-6 mr-2" />
                  Logout
                </div>
              </li>
            </div>
          </ul>
        </div>
      </aside>
      <button
        className="md:hidden flex items-center justify-between h-16 top-0 left-0 z-50 p-4"
        onClick={toggleSidebar}
      >
        <IoMdMenu className="w-8 h-8" />
      </button>
    </>
  );
};

export default Sidebar;
