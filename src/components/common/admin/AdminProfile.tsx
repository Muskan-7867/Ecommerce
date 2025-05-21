import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAdminQuery } from "../../../services/queries";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const AdminProfile: React.FC = () => {
  const { data, isLoading, isError } = useQuery(getAdminQuery());
  const navigate = useNavigate();

  const handleLogOut = () =>{
    Cookies.remove("admintoken");
   setTimeout(() => {
      navigate("/adminlogin");
   }, 1000)
  }

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load profile</p>;

  const admin = data?.admin;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg ">
         <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-primary">Admin Profile</h1>
        <button
          onClick={handleLogOut}
          className="bg-white text-red-400 border-primary border-1 px-4 py-2 rounded-md  transition"
        >
          Logout
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
          {admin?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-xl font-medium">{admin?.name}</p>
          <p className="text-sm text-gray-600">{admin?.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">Name</label>
          <p className="text-base font-medium">{admin?.name}</p>
        </div>
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <p className="text-base font-medium">{admin?.email}</p>
        </div>
        <div>
          <label className="text-sm text-gray-600">Role</label>
          <p className="text-base font-medium capitalize">{admin?.role}</p>
        </div>
      
      </div>
    </div>
  );
};

export default AdminProfile;
