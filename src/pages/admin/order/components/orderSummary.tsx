import React from "react";
import Summary from "../../../../components/common/admin/Summary";
import { joining, monthjoining, notification, payment } from "../../../../constants/imagePath"

const bookingData = [
    { title: "Today's orders", amount: "16", icon: joining },
    { title: "Month's orders", amount: "62", icon: monthjoining },
    { title: "Total orders", amount: "65", icon: payment },
    { title: "Total Payment", amount: "$1280", icon: notification },
];

const OrderSummary: React.FC = () => {
    return <Summary data={bookingData} />;
};

export default OrderSummary;
