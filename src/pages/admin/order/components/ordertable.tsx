import { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import TableData, { Column } from "./TableData";
import { fetchOrdersQuery } from "../../../../services/queries";
import { OrderItem } from "../../../../types/Product";
import Pagination from "../../../user/products/components/Pagination";

export interface Payment {
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
}

export interface Order {
  quantity: number;
  totalPrice: number;
  status: string;
  isPaid: boolean;
  payment: Payment;
  orderItems: OrderItem[];
  action: string;
}

const OrderTable = () => {
  const [page] = useQueryState("page", { defaultValue: "1" });
  const currentPage = Number(page);
  const itemsPerPage = 10;

  const {
    data: orders = [],
    isLoading,
    error
  } = useQuery<Order[]>(fetchOrdersQuery());
  console.log(" from oredrs", orders);

  const [localOrders, setLocalOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (orders.length) {
      setLocalOrders(orders);
    }
  }, [orders]);
  if (orders.length === 0) {
    return <p className="p-4 text-center">You have not placed any orders yet.</p>;
  }

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
    { label: "Quantity", key: "quantity" },
    { label: "Total Price", key: "totalPrice" },
    {
      label: "Status",
      render: (order) => {
        const handleStatusChange = (
          e: React.ChangeEvent<HTMLSelectElement>
        ) => {
          const updated = localOrders.map((o) =>
            o === order ? { ...o, status: e.target.value } : o
          );
          setLocalOrders(updated);
        };

        const selected = order.status
          
        return (
          <select
            className={`px-3 py-1 rounded-md outline-none ${selected ? 'border-none' : ""}`}
            value={selected}
            onChange={handleStatusChange}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="delievered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        );
      }
    },
    {
      label: "Is Paid",
      render: (order) => {
        const handleTogglePaid = () => {
          const updated = localOrders.map((o) =>
            o === order ? { ...o, isPaid: !o.isPaid } : o
          );
          setLocalOrders(updated);
        };

        return (
          <input
            type="checkbox"
            checked={order.isPaid}
            onChange={handleTogglePaid}
            className="w-5 h-5 cursor-pointer accent-primary"
          />
        );
      }
    },
{
  label: "Payment Status",
  render: (order) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const updated = localOrders.map((o) =>
        o === order
          ? {
              ...o,
              payment: { ...o.payment, paymentStatus: e.target.value },
            }
          : o
      );
      setLocalOrders(updated);
    };

    const selected = order.payment?.paymentStatus;

    return (
      <select
        value={selected}
        onChange={handleChange}
        className={`px-3 py-1 rounded-md outline-none ${
          selected ? 'border-none' : ''
        }`}
      >
   
        <option value="paid">Paid</option>
        <option value="pending">Pending</option>
        <option value="failed">Failed</option>
      </select>
    );
  },
}
,
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

export default OrderTable;
