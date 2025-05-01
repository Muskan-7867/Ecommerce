import { useState } from "react";
import Table from "../../../../components/common/admin/Table";
import OrderFilterBar from "../../order/components/orderfilterbar";

interface Order {
  orderid: string;
  username: string;
  quantity: number;
  status: string;
  paymentstatus: string;
}

const orders = [
  {
    orderid: "11002",
    username: "Flores Juanita",
    quantity: 1,
    status: "Pending",
    paymentstatus: "Pending"
  },
  {
    orderid: "11001",
    username: "Miles Esther",
    quantity: 2,
    status: "Shipped",
    paymentstatus: "Paid"
  },
  {
    orderid: "11003",
    username: "Henry Arthur",
    quantity: 5,
    status: "Delivered",
    paymentstatus: "Failed"
  },
  {
    orderid: "11004",
    username: "Black Marvin",
    quantity: 3,
    status: "Cancelled",
    paymentstatus: "Paid"
  },
  {
    orderid: "11005",
    username: "Doe John",
    quantity: 4,
    status: "Processing",
    paymentstatus: "Failed"
  },
  {
    orderid: "11006",
    username: "Smith Alice",
    quantity: 2,
    status: "Shipped",
    paymentstatus: "Completed"
  },
  {
    orderid: "11005",
    username: "Doe John",
    quantity: 4,
    status: "Processing",
    paymentstatus: "Sent"
  },
  {
    orderid: "11006",
    username: "Smith Alice",
    quantity: 2,
    status: "Shipped",
    paymentstatus: "Sent"
  },
  {
    orderid: "11005",
    username: "Doe John",
    quantity: 4,
    status: "Processing",
    paymentstatus: "In Progress"
  },
  {
    orderid: "11006",
    username: "Smith Alice",
    quantity: 2,
    status: "Shipped",
    paymentstatus: "In Progress"
  }
];

const CustomerTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Filter logic
  const filteredOrders = orders.filter((order) => {
    return order.username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Table columns definition
  const columns = [
 
    { label: " Name", key: "orderid" as const },
    { label: " Email", key: "username" as const },
    { label: "Address", key: "quantity" as const },
    { label: "City", key: "status" as const },
    { label: "Pincode", key: "status" as const },
    {
      label: "Payment Status",
      key: "paymentstatus" as const,
      renderData: (order: Order) => {
        let textColor = "text-black"; 

        if (
          ["Completed", "Sent", "In Progress", "Paid"].includes(
            order.paymentstatus
          )
        ) {
          textColor = "text-green-500"; // Green for success statuses
        } else if (order.paymentstatus === "Failed") {
          textColor = "text-red-500"; // Red for failed
        }

        return <span className={textColor}>{order.paymentstatus}</span>;
      }
    },
    {
      label: "Action",
      key: "action" as const,
      renderData: () => (
        <button className="text-black font-bold text-2xl hover:text-gray-800">
          ⋮
        </button>
      )
    }
  ];

  return (
    <>
      <OrderFilterBar
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        selectedDate={selectedDate}
        onDateChange={(e) => setSelectedDate(e.target.value)}
        selectedKYC={""}
        onKYCChange={() => {}}
        selectedMembership={""}
        onMembershipChange={() => {}}
      />

      <Table columns={columns} data={filteredOrders} />
    </>
  );
};

export default CustomerTable;
