import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Sidebar from "./sidebar/Sidebar";

const Index = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar setSidebarOpen={setSidebarOpen} isSidebarOpen={isSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <aside
          className={`bg-[#274963] text-white transition-all duration-500 ease-in-out
            h-[calc(100vh-70px)] overflow-y-auto no-scrollbar
            lg:static lg:block lg:w-1/5
            ${isSidebarOpen ? "absolute z-30 w-4/5 block" : "hidden"}`}
        >
          <Sidebar setSidebarOpen={setSidebarOpen} />
        </aside>

        {/* Content Section */}
        <div className="flex-1 flex flex-col bg-gray-100 h-[calc(100vh-70px)]">
          <main className="flex-1 overflow-y-auto p-6 no-scrollbar">
            <Outlet />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
