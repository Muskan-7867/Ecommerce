import OrderSummary from "./components/orderSummary";
import OrderTable from "./components/ordertable";

const Order = () => {
  return (
    <div className="w-full min-h-screen mt-16  border-2 border-gray-100 py-7 px-8 overflow-y-scroll scrollbar-hide">
      <div className="shadow-lg pl-14 py-6 pr-8 rounded-2xl border border-gray-50 bg-[#FFFFFF]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[24px] font-medium text-[#333333]  underline decoration-solid leading-[36px] font-poppins">
            Order Details
          </h3>
        </div>
        <OrderSummary />
        <OrderTable />
      </div>
    </div>
  );
};

export default Order;
