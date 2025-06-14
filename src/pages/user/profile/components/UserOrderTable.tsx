import React, { useEffect } from "react";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { useQueries } from "@tanstack/react-query";
import { getProductByIdQuery } from "../../../../services/queries";

const UserOrderTable = () => {
  const { currentUserFromStore } = useCurrentUser();
  console.log("from userordertable----", currentUserFromStore);
  useEffect(() => {
    if (currentUserFromStore) {
      console.log("from userordertable", currentUserFromStore?.order);
    }
  }, [currentUserFromStore]);

  const productIds = currentUserFromStore?.order?.flatMap((order) =>
    order.orderItems.map((item) => item.product)
  );

  const productQueries = useQueries({
    queries: productIds?.map((id) => getProductByIdQuery(id)) || []
  });

  const productMap = new Map();
  productQueries.forEach((query, index) => {
    if (query.data) {
      productMap.set(productIds?.[index], query.data);
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  if (!currentUserFromStore) {
    return <p className="text-gray-600">Loading user data...</p>;
  }

  if (!currentUserFromStore.order) {
    return <p className="text-gray-600">Loading order data...</p>;
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
                  Product
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Product Name
                </th>

                <th className="px-6 py-3 text-left text-sm font-medium">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Price
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
              {currentUserFromStore?.order.map((order, index) => (
                <React.Fragment key={index}>
                  {order.orderItems.map((item, itemIndex) => {
                    const product = productMap.get(item.product);

                    return (
                      <tr key={`${index}-${itemIndex}`} className="border-t">
                        <td className="px-6 py-4">
                          {product?.images ? (
                            <img
                              src={product?.images[0].url}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                          ) : (
                            <span className="text-sm text-gray-400">
                              No image
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">{product?.name}</td>
                        
                        <td className="px-6 py-4">{item.quantity}</td>
                        <td className="px-6 py-4">₹{item.price}</td>
                        <td className="px-6 py-4">
                          ₹{item.price * item.quantity}
                        </td>
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
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserOrderTable;
