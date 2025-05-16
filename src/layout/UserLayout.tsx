import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/navbar/Navbar";
import NewFooter from "../components/common/footer/NewFooter";
import AuthProvider from "./auth/AuthProvider";

const UserLayout: React.FC = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Outlet />
      <NewFooter />
    </AuthProvider>
  );
};

export default UserLayout;
