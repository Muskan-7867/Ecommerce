import { useNavigate } from "react-router-dom";
import { CurrentUser } from "../../types/auth";
import axios from "axios";
import Cookies from "js-cookie";
import { OrderData } from "../../types/Product";
import { useState } from "react";

const OrderConfirmPopUp = ({
  currentUserFromStore,
  setShowConfirmPopUp,
  orderData
}: {
  currentUserFromStore: CurrentUser;
  setShowConfirmPopUp: (value: boolean) => void;
  orderData: OrderData;
}) => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = Cookies.get("authToken");
  const [loading, setloading] = useState(false);

  const confirmOrder = async () => {
    setShowConfirmPopUp(false);
    setloading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v2/product/order`,
        {
          ...orderData,
          address: currentUserFromStore.address
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Order placed:", response.data);
      setloading(false);
      setTimeout(() => {
        navigate("/ordersuccesspage");
      }, 1000);

      setTimeout(() => {
        navigate("/products");
      }, 3000);
    } catch (error) {
      console.error("Order failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50">
      {loading && <p>Loading .....</p>}
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-sm ">
        <h2 className="text-lg font-semibold mb-2">Confirm Your Address</h2>
        <p className="text-sm text-gray-700 mb-4">
          Would you like to place the order using this address?
        </p>
        <div className="text-xs bg-gray-100 p-3 rounded-md mb-4">
          {currentUserFromStore?.address?.address1},{" "}
          {currentUserFromStore?.address?.street},{" "}
          {currentUserFromStore?.address?.city},{" "}
          {currentUserFromStore?.address?.state},{" "}
          {currentUserFromStore?.address?.country}, ?
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
            onClick={confirmOrder}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmPopUp;
