import { useEffect } from "react";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { OrderData } from "../../../../types/Product";

const UserOrderTable = () => {
  const { currentUserFromStore } = useCurrentUser()
  

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  if (!currentUserFromStore) {
    return <p className="text-gray-600">Loading user data...</p>;
  }

  return (
    <div className="w-full mt-18">
      <h2 className="text-2xl font-bold text-primary mb-4 px-8">
        Order History
      </h2>

      {currentUserFromStore?.order?.length === undefined ? (
        <p className="text-gray-600">Loading orders...</p>
      ) : currentUserFromStore.order?.length === 0 ? (
        <p className="text-gray-500 p-4 text-center text-lg">
          You have no orders yet.!!
        </p>
      ) : (
        <div className="overflow-x-auto  px-8">
          <table className="min-w-full rounded-lg bg-white border border-gray-200">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Total Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Order Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Paid
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {currentUserFromStore?.order.map((order: OrderData, index: number) => (
                <tr key={index} className="border-t">
                  <td className="px-6 py-4">{order.quantity}</td>
                  <td className="px-6 py-4">₹{order.totalPrice}</td>
                  <td className="px-6 py-4">{order?.status}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-semibold ${
                        order.isPaid ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserOrderTable;
