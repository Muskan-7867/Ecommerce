import { useSingleOrderStore } from "../../../../store/product/Table.store";
import { X } from "lucide-react";
import OrderDateSection from "./OrderDateSection";
import SingleOrderSummary from "./SingleOrderSummary";
import SingleOrderItem from "./SingleOrderItem";

const SingleOrderProd = () => {
  const { selectedRow, setShowSingleOrder } = useSingleOrderStore();

  const handleCross = () => {
    setShowSingleOrder(false);
  };

  if (!selectedRow) return null;

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex justify-center items-center backdrop-blur-md p-4">
      <div onClick={handleCross} className="absolute inset-0" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide"
      >
        {/* Header with close button */}
        <div className="sticky top-0 bg-white p-6 pb-0 flex justify-between items-start z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
            <p className="text-sm text-gray-500 mt-1">
              Order ID: {selectedRow._id}
            </p>
          </div>
          <button
            onClick={handleCross}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Items Section */}
          <SingleOrderItem selectedRow={selectedRow} />

          {/* Order Summary Section */}
          <SingleOrderSummary selectedRow={selectedRow} />

          {/* Dates Section */}
          <OrderDateSection selectedRow={selectedRow} />
        </div>
      </div>
    </div>
  );
};

export default SingleOrderProd;
