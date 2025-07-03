import { useEffect, useState } from "react";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { useQueries } from "@tanstack/react-query";
import { getProductByIdQuery } from "../../../../services/queries";

const UserOrderTable = () => {
  const { currentUserFromStore } = useCurrentUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Flatten all order items from all orders
  const allOrderItems = currentUserFromStore?.order?.flatMap((order) =>
    order.orderItems.map((item) => ({
      ...item,
      orderStatus: order.status,
      isPaid: order.isPaid,
      
    }))
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

  if (currentUserFromStore.order?.length === 0) {
    return (
      <p className="text-gray-500 p-4 text-center text-lg">
        You have no orders yet.!!
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
              <th className="px-6 py-3 text-left text-sm font-medium">Paid</th>
            
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
                    <span
                      className={`font-semibold ${
                        item.isPaid ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {item.isPaid ? "Paid" : "Unpaid"}
                    </span>
                  </td>
              
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 px-8">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              // Show only 5 page numbers at a time
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium ${
                    currentPage === pageNum
                      ? "text-primary bg-primary bg-opacity-10"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default UserOrderTable;
