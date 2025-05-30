import { CurrentUser } from "../../../../types/auth";

const UserAddress = ({
  currentUserFromStore
}: {
  currentUserFromStore: CurrentUser;
}) => {
  // Check if address exists and is not a string
  const address = currentUserFromStore?.address;
  const isAddressValid = address && typeof address !== 'string';

  if (!isAddressValid) {
    return (
      <div className="p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-primary mb-4">Address</h2>
        <p className="text-gray-700">No address available</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl">
      <h2 className="text-xl font-semibold text-primary mb-4">Address</h2>
      <div className="text-gray-700 space-y-1">
        {address.address1 && (
          <p>
            <strong>Address 1:</strong> {address.address1}
          </p>
        )}
        {address.address && (
          <p>
            <strong>Address 2:</strong> {address.address}
          </p>
        )}
        <p>
          <strong>Street:</strong> {address.street}
        </p>
        <p>
          <strong>City:</strong> {address.city}
        </p>
        <p>
          <strong>State:</strong> {address.state}
        </p>
        <p>
          <strong>Country:</strong> {address.country}
        </p>
        <p>
          <strong>Pincode:</strong> {address.pincode}
        </p>
        <p>
          <strong>Phone:</strong> {address.phone}
        </p>
      </div>
    </div>
  );
};

export default UserAddress;