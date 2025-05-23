import PaymentSummary from "./PaymentSummary";
import { Product } from "../../../../types/Product";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useCurrentUserStore from "../../../../store/User/user.store";
import { CurrentUser } from "../../../../types/auth";
import SummaryDetails from "./SummaryDetails";
import Cookies from "js-cookie";
import { RazorpayResponse } from "razorpay";

interface CartSummaryProps {
  products: Product[];
  quantities: { [id: string]: number };
}

const CartSummaryForBuy: React.FC<CartSummaryProps> = ({
  products,
  quantities
}) => {
  const { isLoggined } = useCurrentUserStore();
  const { currentUserFromStore } = useCurrentUserStore() as {
    currentUserFromStore: CurrentUser;
  };

  const navigate = useNavigate();
  const [loginMsg, setLoginMsg] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const subtotal = products.reduce((acc, product) => {
    const qty = quantities[product._id] || 1;
    return acc + product.price * qty;
  }, 0);

  const deliveryCharge = products.reduce((acc, product) => {
    const charge = Number(product?.deliveryCharges || 0);
    return acc + (isNaN(charge) ? 0 : charge);
  }, 0);

  const total = subtotal + deliveryCharge;
  const totalQuantity = Object.values(quantities).reduce(
    (acc, qty) => acc + qty,
    0
  );

  const orderItems = products.map((product) => ({
    product: product._id,
    price: product.price,
    quantity: quantities[product._id] || 1
  }));

  const orderData = {
    quantity: totalQuantity,
    totalQuantity,
    totalPrice: total,
    address: currentUserFromStore?.address?._id,
    orderItems,
    status: "pending",
    deliveryCharges: deliveryCharge
  };

  const handleOrder = async () => {
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

    try {
      setLoading(true);

      // Make backend API call to create Razorpay order
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/order/cartrazorpayorder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("authToken")}`
          },
          body: JSON.stringify({
            cartProductIds: products.map((p) => p._id),
            address: currentUserFromStore.address._id,
            quantities: quantities
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        const { razorpayOrder, order } = data;

        const options = {
          key: import.meta.env.VITE_PUBLIC_RAZORPAY_ID,

          amount: razorpayOrder.amount,
          quantity: totalQuantity,
          currency: "INR",
          name: "Omeg Bazaar",
          description: "Order Payment",
          order_id: razorpayOrder.id,
          handler: async function (response: RazorpayResponse) {
            try {
              const verifyRes = await fetch(
                `${import.meta.env.VITE_BASE_URL}/api/v1/order/paymentverify`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("authToken")}`
                  },
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    orderId: order._id
                  })
                }
              );

              const verifyData = await verifyRes.json();

              if (verifyData.success) {
                console.log("Payment verified successfully.");
              } else {
                alert("Payment verification failed.");
              }
            } catch (err) {
              console.error("Verification error:", err);
              alert("Something went wrong during payment verification.");
            }
          },
          prefill: {
            name: currentUserFromStore.username,
            email: currentUserFromStore.email,
            contact: currentUserFromStore.contact || ""
          },
          theme: {
            color: "#3399cc"
          }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        alert("Failed to create order: " + data.message);
      }
    } catch (error) {
      console.error("Order creation error:", error);
      alert("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 font-serif text-primary">
        Cart Summary
      </h1>

      {loginMsg && (
        <div className="mb-4 p-4 bg-yellow-100 text-yellow-700 rounded">
          Please log in to place your order. Redirecting...
        </div>
      )}

      <SummaryDetails
        subtotal={subtotal}
        total={total}
        deliveryCharge={deliveryCharge}
      />

      <PaymentSummary
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />

      <button
        onClick={handleOrder}
        className="bg-primary text-white py-2 px-4 rounded-full mt-6 w-full"
        disabled={loading}
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
};

export default CartSummaryForBuy;
