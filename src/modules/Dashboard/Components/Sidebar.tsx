import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut, IoMdMenu } from "react-icons/io";
import {
  IoIosHome,
  IoIosList,
  IoIosPeople,
  IoIosChatbubbles,
  IoIosCash,
} from "react-icons/io";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const [selectedLink, setSelectedLink] = useState("landingpage");
  const navigate = useNavigate();
  const sidebar = useRef(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
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

  const links = [
    {
      name: "Home",
      path: "landingpage",
      icon: <IoIosHome className="text-2xl" />,
    },
    {
      name: "Properties",
      path: "properties",
      icon: <IoIosList className="text-2xl" />,
    },
    {
      name: "Users",
      path: "users",
      icon: <IoIosPeople className="text-2xl" />,
    },
    {
      name: "Inquiry",
      path: "inquiry",
      icon: <IoIosChatbubbles className="text-2xl" />,
    },
    {
      name: "Transaction",
      path: "transaction",
      icon: <IoIosCash className="text-2xl" />,
    },
  ];

  return (
    <>
      <aside
        ref={sidebar}
        className={`absolute w-[15%] text-white left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-red-500 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="md:overflow-y-auto">
          <ul className="py-4 flex justify-between gap-3 flex-col">
            {links.map((link) => (
              <li
                key={link.name}
                className={`cursor-pointer flex items-center px-6 py-4  hover:bg-gray-700 transition-all ease-in-out delay-75
                  ${selectedLink === link.name && "bg-gray-200"}
                  `}
                onClick={() => handleLinkClick(link.path)}
              >
                <span className="mr-2">{link.icon}</span> {/* Display icon */}
                {link.name}
              </li>
            ))}
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
