import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Sidebar from "./sidebar/Sidebar";


const Index = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <aside className="w-1/6 bg-[#274963]">
          <Sidebar />
        </aside>
        <div className="flex-1 bg-[#F0F4F8] flex flex-col">
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
