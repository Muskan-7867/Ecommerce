import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import placeOrder from "../../services/order";
import { OrderData, Product } from "../../types/Product";
import useCurrentUser from "../useCurrentUser";
import { initiateRazorpayPayment } from "../../services/cart/razorpayforcartorder";

interface Props {
  orderData: OrderData;
  products: Product[];
  paymentmethod: string;
  setLoading: (val: boolean) => void;
  setShowConfirmPopUp: (val: boolean) => void;
  setShowSuccessPopup: (value: boolean) => void;
}

const useOrderHandler = ({
  orderData,
  products,
  paymentmethod,
  setLoading,
  setShowConfirmPopUp,
  setShowSuccessPopup
}: Props) => {
  const navigate = useNavigate();
  const token = Cookies.get("authToken");

  const { currentUserFromStore } = useCurrentUser();

  const placeOrderHandler = async () => {
    setShowConfirmPopUp(false);
    setLoading(true);

    const dataForCod = {
      ...orderData,
      paymentMethod: paymentmethod
    };

    try {
      const response = await placeOrder(dataForCod, Cookies.get("authToken")!);
      if (response?.data.success) {
        setShowSuccessPopup(true);
        setTimeout(() => {
          navigate("/products");
        }, 2000);
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
    if (!token) {
      console.error("No auth token found");
      return;
    }

    if (paymentmethod === "cash_on_delivery") {
      await placeOrderHandler();
    } else {
      await initiateRazorpayPayment({
        orderData,
        products,
        currentUserFromStore,
        token,
        navigate,
        setLoading,
        paymentmethod,
        setShowSuccessPopup
      });
      setShowConfirmPopUp(false);
    }
  };

  return { handlePlaceOrder };
};

export default useOrderHandler;
