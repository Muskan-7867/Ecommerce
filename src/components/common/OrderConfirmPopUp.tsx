import { useNavigate } from "react-router-dom";
import { CurrentUser } from "../../types/auth";
import { OrderData, Product } from "../../types/Product";
import { useState } from "react";
import useOrderHandler from "../../hooks/useOrderHandler";

interface Props {
  currentUserFromStore: CurrentUser;
  setShowConfirmPopUp: (value: boolean) => void;
  orderData: OrderData;
  products: Product[];
  paymentmethod: string;
}

const OrderConfirmPopUp = ({
  currentUserFromStore,
  setShowConfirmPopUp,
  orderData,
  products,
  paymentmethod
}: Props) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { handlePlaceOrder } = useOrderHandler({
    orderData,
    products,
    paymentmethod,
    setLoading,
    setShowConfirmPopUp
  });
  const handleCross = () => {
    setShowConfirmPopUp(false);
  };
  return (
    <div
      onClick={handleCross}
      className="fixed inset-0 backdrop-blur-sm  bg-opacity-30 flex justify-center items-center z-50 p-4"
    >
      {loading ? (
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          </div>
          <h3 className="text-lg font-medium text-gray-800">
            Processing your order...
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            Please wait while we confirm your details
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-md">
          <div className="bg-primary p-5 text-white">
            <h2 className="text-xl font-semibold">Confirm Your Order</h2>
            <p className="text-sm opacity-90 mt-1">
              Please verify your delivery address before placing the order
            </p>
          </div>

          <div className="p-5">
            <div className="border border-gray-200 rounded-lg p-4 mb-5">
              <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                Delivery Address
              </h4>
              <p className="text-sm text-gray-600">
                {currentUserFromStore?.address?.address1},<br />
                {currentUserFromStore?.address?.street},<br />
                {currentUserFromStore?.address?.city},{" "}
                {currentUserFromStore?.address?.state},<br />
                {currentUserFromStore?.address?.country} -{" "}
                {currentUserFromStore?.address?.pincode}
              </p>
            </div>

            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              <button
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex-1 flex items-center justify-center"
                onClick={() => {
                  setShowConfirmPopUp(false);
                  navigate("/addressform");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Change Address
              </button>
              <button
                className="px-5 py-2.5 bg-gradient-to-r from-primary to-red-100 rounded-lg text-white font-medium hover:opacity-90 transition-opacity flex-1 flex items-center justify-center"
                onClick={handlePlaceOrder}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmPopUp;
