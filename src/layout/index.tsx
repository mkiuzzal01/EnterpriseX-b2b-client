import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import { useState } from "react";
import Sidebar from "./sidebar/Sidebar";

const Index = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <Navbar setSidebarOpen={setSidebarOpen} isSidebarOpen={isSidebarOpen} />

      <div className="flex flex-1 relative">
        <aside
          className={`bg-[#274963] h-[calc(100vh-70px)] transition-all duration-1000 ease-in-out
          lg:static lg:block lg:w-1/6 
          ${isSidebarOpen ? "absolute z-30 w-4/5 block" : "hidden"}`}
        >
          <Sidebar />
        </aside>

        <div className="flex-1 bg-[#F0F4F8] flex flex-col h-[calc(100vh-70px)]">
          <main className="flex-1 overflow-y-auto p-4">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
