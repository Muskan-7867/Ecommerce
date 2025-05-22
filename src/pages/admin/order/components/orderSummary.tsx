import React from "react";
import Summary from "../../../../components/common/admin/Summary";
import { CgToday } from "react-icons/cg";
import { MdCalendarMonth, MdSummarize } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { fetchOrdersQuery } from "../../../../services/queries";

interface Order {
  createdAt: string;
   totalPrice: number;
  payment?: {
    amount: number;
  };
}

const OrderSummary: React.FC = () => {
  const { data: orders = [] } = useQuery<Order[]>(fetchOrdersQuery());

  // Get current date and month
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const todayString = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD

  // Calculate summary data
  const todaysOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
    return orderDate === todayString;
  }).length;

  const monthsOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return (
      orderDate.getMonth() === currentMonth &&
      orderDate.getFullYear() === currentYear
    );
  }).length;

  const totalOrders = orders.length;

  const totalPayment = orders.reduce((sum, order) => {
    return sum + (order.totalPrice || 0);
  }, 0);

  const bookingData = [
    { title: "Today's orders", amount: todaysOrders.toString(), icon: CgToday },
    {
      title: "Month's orders",
      amount: monthsOrders.toString(),
      icon: MdCalendarMonth
    },
    {
      title: "Total orders",
      amount: totalOrders.toString(),
      icon: MdSummarize
    },
    {
      title: "Total Payment",
      amount: `₹ ${totalPayment.toFixed(2)}`,
      icon: RiSecurePaymentFill
    }
  ];

  return <Summary data={bookingData} />;
};

export default OrderSummary;
