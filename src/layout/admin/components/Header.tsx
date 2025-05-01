import { useState } from "react";

import { FaBell } from "react-icons/fa";
import UserProfile from "../../../components/common/admin/UserProfile";

const Header: React.FC = () => {
  const [notifications] = useState(1);

  return (
    <div className="relative flex items-center justify-end gap-4">
      {/* Notification Icon with Red Dot */}
      <div className="relative mr-40 top-5 cursor-pointer ">
        <FaBell className="text-primary w-8 h-8" />

        {notifications > 0 && (
          <div className="absolute top-0 right-0 bg-white text-primary border  border-primary text-xs font-bold w-4 h-4 flex  items-center justify-center rounded-full">
            {notifications}
          </div>
        )}
      </div>

      {/* User Profile Component */}
      <UserProfile
        name="Jane Cooper"
        email="cooper02@example.com"
        role="Super admin"
        imageUrl="../../../../public/assets/user.png"
      />
    </div>
  );
};

export default Header;
