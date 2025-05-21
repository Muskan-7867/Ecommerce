import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import placeOrder from "../services/order";
import { OrderData, Product } from "../types/Product";
import useCurrentUser from "./useCurrentUser";
import { initiateRazorpayPayment } from "../services/razorpay";
import { CurrentUser } from "../types/auth";

interface Props {
  orderData: OrderData;
  products: Product[];
  paymentmethod: string;
  setLoading: (val: boolean) => void;
  setShowConfirmPopUp: (val: boolean) => void;
}

const useOrderHandler = ({
  orderData,
  products,
  paymentmethod,
  setLoading,
  setShowConfirmPopUp
}: Props) => {
  const navigate = useNavigate();
  const token = Cookies.get("authToken");
  const authHeader = token ? `Bearer ${token}` : null;

  const { currentUser } = useCurrentUser() as { currentUser: CurrentUser };

  const placeOrderHandler = async () => {
    setShowConfirmPopUp(false);
    setLoading(true);
    try {
      const response = await placeOrder(orderData);
      if (response?.data.success) {
        navigate("/ordersuccesspage");
      } else {
        console.error("Failed to place order");
      }
    } catch (err) {
      console.error("Error placing order:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!authHeader) {
      console.error("No auth token found");
      return;
    }

    if (paymentmethod === "cod") {
      await placeOrderHandler();
    } else {
      await initiateRazorpayPayment({
        orderData,
        products,
        currentUser,
        authHeader,
        navigate,
        setLoading
      });
    }
  };

  return { handlePlaceOrder };
};

export default useOrderHandler;
