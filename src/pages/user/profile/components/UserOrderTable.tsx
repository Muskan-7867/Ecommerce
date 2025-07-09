import { useEffect, useState } from "react";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { useQueries } from "@tanstack/react-query";
import { getProductByIdQuery } from "../../../../services/queries";
import Pagination from "./OrderPagination";

const UserOrderTable = () => {
  const { currentUserFromStore } = useCurrentUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Flatten all order items from all orders and filter:
  // - Online payment orders that are paid
  // - COD orders (regardless of payment status)
  const allOrderItems = currentUserFromStore?.order
    ?.flatMap((order) =>
      order.orderItems.map((item) => ({
        ...item,
        orderStatus: order.status,
        isPaid: order.isPaid,
        paymentMethod: order.paymentMethod
      }))
    )
    ?.filter(
      (item) =>
        (item.paymentMethod === "online_payment" && item.isPaid) ||
        item.paymentMethod === "cash_on_delivery"
    );

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    allOrderItems?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = Math.ceil((allOrderItems?.length || 0) / itemsPerPage);

  // Get unique product IDs for the current page only (to minimize queries)
  const productIds = currentItems.map((item) => item.product);

  const productQueries = useQueries({
    queries: productIds?.map((id) => getProductByIdQuery(id)) || []
  });

  const productMap = new Map();
  productQueries.forEach((query, index) => {
    if (query.data) {
      productMap.set(productIds[index], query.data);
    }
  });

  if (!currentUserFromStore) {
    return <p className="text-gray-600">Loading user data...</p>;
  }

  if (!currentUserFromStore.order) {
    return <p className="text-gray-600">Loading order data...</p>;
  }

  if (allOrderItems?.length === 0) {
    return (
      <p className="text-gray-500 p-4 text-center text-lg mt-28">
        You have no orders yet.
      </p>
    );
  }

  return (
    <div className="w-full mt-18">
      <h2 className="text-2xl font-bold text-primary mb-4 px-8">
        Order History ({allOrderItems?.length || 0} items)
      </h2>
      <div className="overflow-x-auto px-8 scrollbar-hide">
        <table className="min-w-full rounded-lg bg-white border border-gray-200">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Product
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">Price</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Total</th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Payment Method
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Is Paid
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentItems.map((item, index) => {
              const product = productMap.get(item.product);
              return (
                <tr key={index} className="border-t">
                  <td className="px-6 py-4">
                    {product?.images?.[0]?.url ? (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <span className="text-sm text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {product?.name || "Product not found"}
                  </td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4">₹{item.price}</td>
                  <td className="px-6 py-4">₹{item.price * item.quantity}</td>
                  <td className="px-6 py-4">{item.orderStatus}</td>
                  <td className="px-6 py-4">
                    {item.paymentMethod === "online" ? (
                      <span className="font-semibold text-green-600">
                        Paid Online
                      </span>
                    ) : (
                      <span className="font-semibold text-blue-600">
                        Cash on Delivery
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {item.isPaid ? (
                      <span className="text-green-600 font-semibold">Paid</span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        Not Paid
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default UserOrderTable;
