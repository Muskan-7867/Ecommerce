import { useQuery } from "@tanstack/react-query";
import { fetchOrdersQuery } from "../../../../services/queries";
import { Order } from "../../../admin/order/components/OrderTable";
import { useEffect } from "react";

const UserOrderTable = () => {
  const { data: orders, isLoading } = useQuery(fetchOrdersQuery());

  useEffect(() => {
    window.scrollTo(0, 0); 
  })
  return (
    <div className="w-full mt-18">
      <h2 className="text-2xl font-bold text-primary mb-4 px-8">Order History</h2>

      {isLoading ? (
        <p className="text-gray-600">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500 p-4 text-center text-lg">You have no orders yet.!!</p>
      ) : (
        <div className="overflow-x-auto  px-8">
          <table className="min-w-full rounded-lg bg-white border border-gray-200">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Total Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Paid
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {orders.map((order: Order, index: number) => (
                <tr key={index} className="border-t">
                  <td className="px-6 py-4">{order.quantity}</td>
                  <td className="px-6 py-4">₹{order.totalPrice}</td>
                  <td className="px-6 py-4">
                    {order.payment?.paymentMethod || "N/A"}
                  </td>
                  <td className="px-6 py-4">{order.isPaid ? "Yes" : "No"}</td>
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
