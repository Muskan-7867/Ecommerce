import { useNavigate } from "react-router-dom";
import useCurrentUser from "../../../hooks/useCurrentUser";
import UserAddress from "./components/UserAddress";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUserFromStore } = useCurrentUser();

  const handleEdit = () => {
    navigate(`/edit/${currentUserFromStore?._id}`);
  };

  if (!currentUserFromStore) return null;

  return (
    <div className="w-full max-w-6xl mx-auto mt-26 p-4">
      <div className="bg-white rounded-xl   overflow-hidden">
        <div className="grid md:grid-cols-3 gap-8 p-6">
          {/* User Info - Left Side */}
          <div className="md:col-span-1 flex flex-col items-center text-center space-y-4">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-200">
              <img
                src="/assets/user.png"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-1">
              <h2 className="text-xl font-medium text-primary">
                {currentUserFromStore.username}
              </h2>
              <p className="text-gray-600 text-sm">{currentUserFromStore.email}</p>
              <p className="text-gray-700">{currentUserFromStore.contact}</p>
            </div>

            <div className="w-full space-y-3 pt-2">
              <button
                onClick={handleEdit}
                className="w-full bg-white text-gray-800 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Profile
              </button>
              <button
                onClick={() => navigate("/userordertable")}
                className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
                My Orders
              </button>
            </div>
          </div>

          {/* Address Card - Right Side */}
          <div className="md:col-span-2 border-l md:border-l-gray-200 md:pl-8">
            <UserAddress currentUserFromStore={currentUserFromStore} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;