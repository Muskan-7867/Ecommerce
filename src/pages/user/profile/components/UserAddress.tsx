import { CurrentUser } from "../../../../types/auth";

const UserAddress = ({ currentUser }: { currentUser: CurrentUser }) => {
  return (
    <div className=" p-6 rounded-xl ">
      <h2 className="text-xl font-semibold text-primary mb-4">Address</h2>
      <div className="text-gray-700 space-y-1">
        <p>
          <strong>Address 1:</strong> {currentUser?.address?.address1}
        </p>
        <p>
          <strong>Address 2:</strong> {currentUser?.address?.address}
        </p>
        <p>
          <strong>Street:</strong> {currentUser?.address?.street}
        </p>
        <p>
          <strong>City:</strong> {currentUser?.address?.city}
        </p>
        <p>
          <strong>State:</strong> {currentUser?.address?.state}
        </p>
        <p>
          <strong>Country:</strong> {currentUser?.address?.country}
        </p>
        <p>
          <strong>Pincode:</strong> {currentUser?.address?.pincode}
        </p>
        <p>
          <strong>Phone:</strong> {currentUser?.address?.phone}
        </p>
      </div>
    </div>
  );
};

export default UserAddress;
