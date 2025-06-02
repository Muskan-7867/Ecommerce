import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RazorpayResponse } from "razorpay";
import placeOrder from "../services/order";
import { Product } from "../types/Product";
import { AddressFormData, CurrentUser } from "../types/auth";
import { createRazorpayOrder, verifyPayment } from "../services/paymentforbuy";
import { PaymentType } from "../pages/user/cart/components/CartSummary";

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

export const usePaymentHandlerForBuy = () => {
  const [loading, setLoading] = useState(false);
  const [loginMsg, setLoginMsg] = useState(false);
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

  const handleOrder = async (
    orderData: OrderData,
    products: Product[],
    quantities: { [id: string]: number },
    paymentMethod: PaymentType,
    isLoggined: boolean,
    currentUserFromStore: CurrentUser
  ) => {
    if (!isLoggined) {
      setLoginMsg(true);
     navigate("/login");
    
      return;
    }

    const address = currentUserFromStore?.address;
    if (!address || typeof address === "string" || !address._id) {
      navigate("/addressform");
      return;
    }

    const orderWithTypedAddress: OrderData = {
      ...orderData,
      address: address as AddressFormData 
    };

    if (paymentMethod === "cash_on_delivery") {
      return handleCODOrder(orderWithTypedAddress);
    }

    return handleOnlinePayment(
      products,
      quantities,
      paymentMethod,
      currentUserFromStore
    );
  };

  const handleCODOrder = async (orderData: OrderData) => {
    try {
      setLoading(true);
      const response = await placeOrder(orderData);

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

  const handleOnlinePayment = async (
    products: Product[],
    quantities: { [id: string]: number },
    paymentMethod: PaymentType,
    currentUserFromStore: CurrentUser
  ) => {
    try {
      setLoading(true);

      const address = currentUserFromStore.address;
      if (!address || typeof address === "string" || !address._id) {
        throw new Error("Valid address with ID is required");
      }

      for (const product of products) {
        const quantity = quantities[product._id] || 1;

        const data = await createRazorpayOrder(
          product._id,
          address._id,
          quantity,
          paymentMethod
        );

        if (data.success) {
          const { razorpayOrder, orderId } = data;
          openRazorpayWindow(
            razorpayOrder,
            orderId,
            product,
            paymentMethod,
            currentUserFromStore
          );
          break;
        } else {
          showPopup(
            "Failed to create Razorpay order: " + data.message,
            "error"
          );
        }
      }
    } catch (error) {
      console.error("Online payment order error:", error);
      showPopup(
        error instanceof Error
          ? error.message
          : "Failed to place online order.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const openRazorpayWindow = (
    razorpayOrder: {
      id: string;
      amount: number;
      currency: string;
    },
    orderId: string,
    product: Product,
    paymentMethod: PaymentType,
    currentUserFromStore: CurrentUser
  ) => {
    const options = {
      key: import.meta.env.VITE_PUBLIC_RAZORPAY_ID as string,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency || "INR",
      name: "Omeg Bazaar",
      description: `Payment for ${product.name}`,
      order_id: razorpayOrder.id,
      handler: async (response: RazorpayResponse) => {
        try {
          const verifyData = await verifyPayment(
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            },
            orderId,
            paymentMethod
          );

          if (verifyData.success) {
            showPopup("Payment verified and order placed successfully!");
          } else {
            showPopup("Payment verification failed.", "error");
          }
        } catch (err) {
          console.error("Verification error:", err);
          showPopup(
            err instanceof Error ? err.message : "Payment verification error.",
            "error"
          );
        }
      },
      prefill: {
        name: currentUserFromStore.username || "",
        email: currentUserFromStore.email || "",
        contact: currentUserFromStore.contact || ""
      },
      theme: {
        color: "#ca8888"
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return { loading, loginMsg, handleOrder, popup };
};