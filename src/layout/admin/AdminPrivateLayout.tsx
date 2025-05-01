import React from "react";

import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";



const AdminPrivateLayout: React.FC = () => {
  return (
    <div className="flex h-screen w-full bg-glamgo-base-red">
       <Sidebar />
      <div className="flex flex-col w-full overflow-y-scroll">
        <Header />
        <div className="flex-grow">
          <Outlet />
        </div>
 
      </div>
    </div>
  );
};

export default AdminPrivateLayout;

