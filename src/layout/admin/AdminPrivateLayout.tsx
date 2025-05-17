import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const AdminPrivateLayout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("dashboard");
  }, []);

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar (fixed height) */}
      <Sidebar />

      {/* Right panel with header and main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto  p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPrivateLayout;
