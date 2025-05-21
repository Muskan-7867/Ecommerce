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
  paymentmethod,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { handlePlaceOrder } = useOrderHandler({
    orderData,
    products,
    paymentmethod,
    setLoading,
    setShowConfirmPopUp,
  });

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50">
      {loading && <p>Loading .....</p>}
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-sm">
        <h2 className="text-lg font-semibold mb-2">Confirm Your Address</h2>
        <p className="text-sm text-gray-700 mb-4">
          Would you like to place the order using this address?
        </p>
        <div className="text-xs bg-gray-100 p-3 rounded-md mb-4">
          {currentUserFromStore?.address?.address1},{" "}
          {currentUserFromStore?.address?.street},{" "}
          {currentUserFromStore?.address?.city},{" "}
          {currentUserFromStore?.address?.state},{" "}
          {currentUserFromStore?.address?.country},{" "}
          {currentUserFromStore?.address?.pincode}
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => {
              setShowConfirmPopUp(false);
              navigate("/addressform");
            }}
          >
            Change Address
          </button>
          <button
            className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
            onClick={handlePlaceOrder}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmPopUp;
