import { useNavigate } from "react-router-dom";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { CurrentUser } from "../../../types/auth";

import UserAddress from "./components/UserAddress";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser() as {
    currentUser: CurrentUser | null;
  };

  const handleEdit = () => {
    navigate(`/edit/${currentUser?._id}`);
  };

  if (!currentUser) return null;

  return (
    <div className="w-full max-w-6xl mx-auto mt-28 p-6 bg-white rounded-3xl space-y-10">
      <div className="grid md:grid-cols-2 gap-6">
        {/* User Info */}
        <div className="p-6 rounded-xl flex flex-col items-center text-center">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary mb-4">
            <img
              src="/assets/user.png"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold text-primary">
            {currentUser.username}
          </h1>
          <p className="text-gray-600">{currentUser.email}</p>
          <p className="text-gray-700">{currentUser.contact}</p>

          <div className="mt-4 flex flex-col gap-2 w-full">
            <button
              onClick={handleEdit}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
            >
              Edit Profile
            </button>
            <button
              onClick={() => navigate("/userordertable")}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              View My Orders
            </button>
          </div>
        </div>

        {/* Address Card */}
        <UserAddress currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Profile;
