import { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  _id: string;
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
  const queryClient = useQueryClient();
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

  if (isLoading) return <div className="p-4 text-center">Loading orders...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Error loading orders: {(error as Error).message}</div>;
  if (orders.length === 0) return <p className="p-4 text-center">You have not placed any orders yet.</p>;

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    order: Order
  ) => {
    const newStatus = e.target.value as
      | "pending"
      | "processing"
      | "delivered"
      | "cancelled";

    const updated = localOrders.map((o) =>
      o === order ? { ...o, status: newStatus } : o
    );
    setLocalOrders(updated);

    try {
      await updateOrderStatus({
        orderId: order._id,
        status: newStatus
      });
      queryClient.invalidateQueries({queryKey: ['updateorderstatus']});
    } catch {
      setLocalOrders(orders);
    }
  };

  const handlePaymentStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    order: Order
  ) => {
    const newPaymentStatus = e.target.value.toLowerCase() as
      | "success"
      | "pending"
      | "failed";

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
    } catch {
      setLocalOrders(orders);
    }
  };

  const handleTogglePaid = async (order: Order) => {
    const newIsPaid = !order.isPaid;

    const updated = localOrders.map((o) =>
      o === order ? { ...o, isPaid: newIsPaid } : o
    );
    setLocalOrders(updated);

    try {
      await updatePaymentPaidStatus({
        orderId: order._id,
        isPaid: newIsPaid
      });
    } catch {
      setLocalOrders(orders);
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
            <p key={i} className="text-sm text-gray-700 line-clamp-2">
              {typeof item.product === "object"
                ? item.product?.name
                : item.product}
            </p>
          ))}
        </div>
      )
    },
    {
      label: "Images",
      render: (order) => (
        <div className="flex flex-wrap gap-1">
          {order.orderItems.map((item, i) => {
            const product = item.product;
            return typeof product === "object" && product?.images?.length ? (
              <img
                key={i}
                src={product.images[0].url}
                alt="Product"
                className="w-10 h-10 object-cover rounded border bg-white"
              />
            ) : (
              <div
                key={i}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 border text-xs text-gray-500 rounded"
              >
                No Image
              </div>
            );
          })}
        </div>
      )
    },
    {
      label: "Qty",
      render: (order) => order.totalQuantity
    },
    { 
      label: "Total", 
      render: (order) => `Rs ${order.totalPrice.toFixed(2)} /-`
    },
    {
      label: "Status",
      render: (order) => (
        <select
          className={`px-2 py-1 rounded-md outline-none text-sm ${
            order.status === "pending" ?" text-yellow-800" :
            order.status === "processing" ? " text-blue-800" :
            order.status === "delivered" ? " text-green-800" :
            " text-red-800"
          }`}
          value={order.status}
          onChange={(e) => handleStatusChange(e, order)}
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      )
    },
    {
      label: "Paid",
      render: (order) => (
        <input
          type="checkbox"
          checked={order.isPaid}
          onChange={() => handleTogglePaid(order)}
          className="w-4 h-4 cursor-pointer accent-primary text-white"
        />
      )
    },
    {
      label: "Payment",
      render: (order) => {
        const selected = order.payment?.paymentStatus?.toLowerCase();
        return (
          <select
            value={selected}
            onChange={(e) => handlePaymentStatusChange(e, order)}
            className={`px-2 py-1 rounded-md outline-none text-sm ${
              selected === "success" ? " text-green-800" :
              selected === "pending" ? " text-yellow-800" :
              " text-red-800"
            }`}
          >
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        );
      }
    },
    { label: "", key: "action" as const }
  ];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <TableData<Order> 
        columns={columns} 
        data={currentOrders} 
        className="max-h-[calc(100vh-200px)]"
      />
      <div className="px-4 py-3  border-t border-gray-200">
        <Pagination totalProducts={orders.length} productPerPage={itemsPerPage} />
      </div>
    </div>
  );
};

export default OrderTableForAdmin;