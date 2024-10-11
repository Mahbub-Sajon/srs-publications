import Sidebar from "@/pages/dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen relative">
      {/* Hamburger button for mobile */}
      <button
        className="md:hidden p-2 bg-gray-800 text-white fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
        style={{ zIndex: 100 }} // Ensures hamburger is above other components
      >
        {/* Hamburger Icon */}
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={
              isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
            }
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white p-4 pt-16 transform transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Added pt-16 to prevent overlap of first menu item with hamburger button */}
        <Sidebar />
      </div>

      {/* Overlay to close sidebar on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 p-4 md:ml-64 mt-16">
        {/* Added mt-16 to make space for the hamburger button */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
