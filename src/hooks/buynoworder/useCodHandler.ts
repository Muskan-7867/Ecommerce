import { useState } from "react";
import { useNavigate } from "react-router-dom";
import placeOrder from "../../services/order";
import { AddressFormData } from "../../types/auth";
import { PaymentType } from "../../pages/user/cart/components/CartSummary";
import Cookies from "js-cookie";

interface OrderData {
  quantity: number;
  totalQuantity: number;
  totalPrice: number;
  address: AddressFormData;
  orderItems: Array<{
    product: string;
    price: number;
    quantity: number;
  }>;
  status: string;
  deliveryCharges: number;
  payment: PaymentType;
  isPaid: boolean;
  paymentMethod: PaymentType;
}

export const useCODHandler = () => {
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error"
  });
  const navigate = useNavigate();

  const showPopup = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setPopup({ show: true, message, type });
    setTimeout(() => {
      setPopup({ show: false, message: "", type: "success" });
      if (type === "success") {
        navigate("/products");
      }
    }, 3000);
  };

  const handleCODOrder = async (orderData: OrderData) => {
    try {
      setLoading(true);
      const response = await placeOrder(orderData, Cookies.get("authToken")!);

      if (response?.data?.success) {
        showPopup("Order placed successfully with Cash on Delivery.");
      } else {
        showPopup("Failed to place order: " + response?.data?.message, "error");
      }
    } catch (error) {
      console.error("COD order error:", error);
      showPopup("Failed to place COD order.", "error");
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleCODOrder, popup };
};