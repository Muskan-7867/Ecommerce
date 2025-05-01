import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/navbar/Navbar";
import NewFooter from "../components/common/footer/NewFooter";

const UserLayout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <NewFooter />
    </div>
  );
};

export default UserLayout;
