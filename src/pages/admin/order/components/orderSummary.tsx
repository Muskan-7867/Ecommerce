import React from "react";
import Summary from "../../../../components/common/admin/Summary";
import { CgToday } from "react-icons/cg";
import { MdCalendarMonth, MdSummarize } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";


const bookingData = [
    { title: "Today's orders", amount: "16", icon: CgToday },
    { title: "Month's orders", amount: "62", icon: MdCalendarMonth },
    { title: "Total orders", amount: "65", icon: MdSummarize },
    { title: "Total Payment", amount: "$1280", icon: RiSecurePaymentFill },
];

const OrderSummary: React.FC = () => {
    return <Summary data={bookingData} />;
};

export default OrderSummary;
