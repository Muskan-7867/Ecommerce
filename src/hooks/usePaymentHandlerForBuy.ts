import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RazorpayResponse } from "razorpay";
import placeOrder from "../services/order";
import { Product } from "../types/Product";
import { CurrentUser } from "../types/auth";
import { createRazorpayOrder, verifyPayment } from "../services/paymentforbuy"
import { PaymentType } from "../pages/user/cart/components/CartSummary";

interface OrderData {
  quantity: number;
  totalQuantity: number;
  totalPrice: number;
  address: CurrentUser['address'];
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
  const navigate = useNavigate();

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
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }

    if (!currentUserFromStore.address || !currentUserFromStore.address._id) {
      navigate("/addressform");
      return;
    }

    if (paymentMethod === "cash_on_delivery") {
      return handleCODOrder(orderData);
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
        alert("Order placed successfully with Cash on Delivery.");
        navigate("/products");
      } else {
        alert("Failed to place order: " + response?.data?.message);
      }
    } catch (error) {
      console.error("COD order error:", error);
      alert("Failed to place COD order.");
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

      if (!currentUserFromStore.address?._id) {
        throw new Error("Address ID is required");
      }

      for (const product of products) {
        const quantity = quantities[product._id] || 1;
        
        const data = await createRazorpayOrder(
          product._id,
          currentUserFromStore.address._id, // Now properly typed as string
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
          alert("Failed to create Razorpay order: " + data.message);
        }
      }
    } catch (error) {
      console.error("Online payment order error:", error);
      alert(error instanceof Error ? error.message : "Failed to place online order.");
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
              razorpay_signature: response.razorpay_signature,
            },
            orderId,
            paymentMethod
          );

          if (verifyData.success) {
            alert("Payment verified and order placed successfully!");
            navigate("/products");
          } else {
            alert("Payment verification failed.");
          }
        } catch (err) {
          console.error("Verification error:", err);
          alert(err instanceof Error ? err.message : "Payment verification error.");
        }
      },
      prefill: {
        name: currentUserFromStore.username || "",
        email: currentUserFromStore.email || "",
        contact: currentUserFromStore.contact || "",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return { loading, loginMsg, handleOrder };
};