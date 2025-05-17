import React from "react";

type UserProfileProps = {
  name: string;
  email: string;
  role: string;
  imageUrl: string;
};

const UserProfile: React.FC<UserProfileProps> = ({
  name,

  imageUrl
}) => {
  // const location = useLocation();
  // const isDashboard = location.pathname === "/dashboard";
  return (
    <div className="relative ">
      {/* Profile Component */}
      <div className="absolute right-1  flex flex-col items-end">
        {/* Profile Image */}
        <div className="w-8 h-8 rounded-full border-4 mr-10 border-primary overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
