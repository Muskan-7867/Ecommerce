import React from "react";
import { useLocation } from "react-router-dom";

type UserProfileProps = {
  name: string;
  email: string;
  role: string;
  imageUrl: string;
};

const UserProfile: React.FC<UserProfileProps> = ({ name, email, role, imageUrl }) => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  return (
    <div className="relative ">
      {/* Profile Component */}
      <div className="absolute right-5 flex flex-col items-end">
        {/* Profile Image */}
        <div className="w-8 h-8 rounded-full border-4 mr-10 border-green-500 overflow-hidden">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        </div>

        {/* User Info */}
        <div className="flex flex-col  text-center ">
          <h2 className="text-md font-bold  ">{name}</h2>
          <p className="text-sm text-gray-600 font-sulfur ">{email}</p>
          {isDashboard && <p className="text-xs  text-gray-500 text-center ">{role}</p>}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
