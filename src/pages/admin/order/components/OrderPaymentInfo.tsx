import { Order } from "../../../../types/order";

const OrderPaymentInfo = ({ selectedRow }: { selectedRow: Order }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold text-lg text-gray-700 border-b pb-2 mb-3">
        Payment Information
      </h3>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Payment Method</p>
          <p className="font-medium">
            {selectedRow.payment?.paymentMethod || "N/A"}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Payment Status</p>
          <p
            className={`font-medium ${
              selectedRow.payment?.paymentStatus === "completed"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            {selectedRow.payment?.paymentStatus || "N/A"}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Order Status</p>
          <p
            className={`font-medium ${
              selectedRow.status === "delivered"
                ? "text-green-600"
                : selectedRow.status === "cancelled"
                ? "text-red-600"
                : "text-blue-600"
            }`}
          >
            {selectedRow.status}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Paid</p>
          <p
            className={`font-medium ${
              selectedRow.isPaid ? "text-green-600" : "text-red-600"
            }`}
          >
            {selectedRow.isPaid ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderPaymentInfo;
