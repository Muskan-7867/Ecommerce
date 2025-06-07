import { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import TableData, { Column } from "./TableData";
import { fetchOrdersQuery } from "../../../../services/queries";
import { OrderItem } from "../../../../types/Product";
import Pagination from "../../../user/products/components/Pagination";
import {
  updateOrderStatus,
  updatePaymentPaidStatus,
  updatePaymentStatus
} from "../../../../services/orderApi";
export interface Payment {
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
}
export interface Order {
  _id: "string"
  quantity: number;
  totalPrice: number;
  status: string;
  isPaid: boolean;
  payment: Payment;
  orderItems: OrderItem[];
  action: string;
  deliveryCharges: number;
  createdAt: string;
  totalQuantity: number;
}

const OrderTableForAdmin = () => {
  const [page] = useQueryState("page", { defaultValue: "1" });
  const currentPage = Number(page);
  const itemsPerPage = 10;
  const {
    data: orders = [],
    isLoading,
    error
  } = useQuery<Order[]>(fetchOrdersQuery());
  const [localOrders, setLocalOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (orders.length) {
      setLocalOrders(orders);
    }
  }, [orders]);
  if (orders.length === 0) {
    return (
      <p className="p-4 text-center">You have not placed any orders yet.</p>
    );
  }
  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    order: Order
  ) => {
    const newStatus = e.target.value as
      | "pending"
      | "processing"
      | "delivered"
      | "cancelled";

    // Optimistic update
    const updated = localOrders.map((o) =>
      o === order ? { ...o, status: newStatus } : o
    );
    setLocalOrders(updated);

    try {
      await updateOrderStatus({
        orderId: order._id, // Assuming your order has an _id field
        status: newStatus
      });
      // Optional: show success message
    } catch {
      // Revert on error
      setLocalOrders(orders);
      // Optional: show error message
    }
  };

  const handlePaymentStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    order: Order
  ) => {
    const newPaymentStatus = e.target.value as "success" | "pending" | "failed";

    // Optimistic update
    const updated = localOrders.map((o) =>
      o === order
        ? {
            ...o,
            payment: { ...o.payment, paymentStatus: newPaymentStatus }
          }
        : o
    );
    setLocalOrders(updated);

    try {
      await updatePaymentStatus({
        orderId: order._id,
        paymentStatus: newPaymentStatus
      });
      // Optional: show success message
    } catch {
      // Revert on error
      setLocalOrders(orders);
      // Optional: show error message
    }
  };

  const handleTogglePaid = async (order: Order) => {
    const newIsPaid = !order.isPaid;

    // Optimistic update
    const updated = localOrders.map((o) =>
      o === order ? { ...o, isPaid: newIsPaid } : o
    );
    setLocalOrders(updated);

    try {
      await updatePaymentPaidStatus({
        orderId: order._id,
        isPaid: newIsPaid
      });
      // Optional: show success message
    } catch {
      // Revert on error
      setLocalOrders(orders);
      // Optional: show error message
    }
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = localOrders.slice(indexOfFirstItem, indexOfLastItem);
  const columns: Column<Order>[] = [
    {
      label: "Order Items",
      render: (order) => (
        <div className="space-y-1">
          {order.orderItems.map((item, i) => (
            <p key={i} className="text-sm text-gray-700">
              {typeof item.product === "object"
                ? item.product?.name
                : item.product}
            </p>
          ))}
        </div>
      )
    },
    {
      label: "Product Image",
      render: (order) => (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:gap-1 gap-4">
          {order.orderItems.map((item, i) => {
            const product = item.product;
            return typeof product === "object" && product?.images?.length ? (
              <img
                key={i}
                src={product.images[0].url}
                alt="Product"
                className="lg:w-12 lg:h-12 md:w-16 md:h-10 sm:w-14 sm:h-8 w-18 h-10 object-cover rounded border bg-white"
              />
            ) : (
              <div
                key={i}
                className="w-12 h-12 flex items-center justify-center bg-gray-100 border text-xs text-gray-500 rounded"
              >
                No Image
              </div>
            );
          })}
        </div>
      )
    },
    {
      label: "Quantity",
      render: (order) => {
        return order.totalQuantity;
      }
    },
    { label: "Total Price", key: "totalPrice" },
    {
      label: "Order Status",
      render: (order) => {
        const selected = order.status;
        return (
          <select
            className={`px-3 py-1 rounded-md outline-none ${
              selected ? "border-none" : ""
            }`}
            value={selected}
            onChange={(e) => handleStatusChange(e, order)}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        );
      }
    },

    {
      label: "Is Paid",
      render: (order) => {
        return (
          <input
            type="checkbox"
            checked={order.isPaid}
            onChange={() => handleTogglePaid(order)}
            className="w-5 h-5 cursor-pointer accent-primary text-white"
          />
        );
      }
    },
    {
      label: "Payment Status",
      render: (order) => {
        const selected = order.payment?.paymentStatus;
        return (
          <select
            value={selected}
            onChange={(e) => handlePaymentStatusChange(e, order)}
            className={`px-3 py-1 rounded-md outline-none ${
              selected ? "border-none" : ""
            }`}
          >
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        );
      }
    },
    { label: "Action", key: "action" as const }
  ];

  if (isLoading) return <div>Loading orders...</div>;
  if (error) return <div>Error loading orders: {(error as Error).message}</div>;

  return (
    <>
      <TableData<Order> columns={columns} data={currentOrders} />
      <Pagination totalProducts={orders.length} productPerPage={itemsPerPage} />
    </>
  );
};

export default OrderTableForAdmin;
