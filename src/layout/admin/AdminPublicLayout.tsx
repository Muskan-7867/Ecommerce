import React from "react";
import { Outlet } from "react-router-dom";

const AdminPublicLayout: React.FC = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <Outlet />
    </div>
  );
};

export default AdminPublicLayout;
