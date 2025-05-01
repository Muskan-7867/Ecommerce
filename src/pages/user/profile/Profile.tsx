import { useNavigate } from "react-router-dom";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { CurrentUser } from "../../../types/auth";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser() as {
    currentUser: CurrentUser | null;
  };

  const handleEdit = () => {
   navigate(`/edit/${currentUser?._id}`)
  };
  return (
    <>
      {currentUser && (
        <div className="w-full h-[50rem] bg-white shadow-xl rounded-3xl p-6 flex flex-col items-center justify-start gap-4 transition-all mt-28">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-sm flex justify-center mt-8">
            <img src="../../../../public/assets/user.png" />
          </div>

          {/* User Info */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-primary">
              {currentUser.username}
            </h1>
            <p className="text-gray-600">{currentUser.email}</p>
            <p className="text-black">{currentUser.contact}</p>
          </div>

          <button
            onClick={handleEdit}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary transition "
          >
            Edit Profile
          </button>

          {/* Address */}
          <div className="w-full flex flex-col items-start justify-center gap-4 mt-8">
            <h1 className="text-2xl font-bold text-primary">Address</h1>
            <p className="text-gray-600">{currentUser?.address}</p>
          </div>

          {/* Order History*/}
          <div className="w-full flex flex-col items-start justify-center gap-4 mt-8">
            <h1 className="text-2xl font-bold text-primary">Order History</h1>
            <p className="text-gray-600">No Orders Yet</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
