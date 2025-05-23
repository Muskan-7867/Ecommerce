import axios from "axios";
import { OrderData, Product } from "../types/Product";
import { CurrentUser } from "../types/auth";

// Add this import
import { RazorpayResponse } from "razorpay";

interface RazorpayParams {
  orderData: OrderData;
  products: Product[];
  currentUser: CurrentUser;
  authHeader: string;
  navigate: (path: string) => void;
  setLoading: (val: boolean) => void;
}

export const initiateRazorpayPayment = async ({
  orderData,
  products,
  currentUser,
  authHeader,
 
  setLoading
}: RazorpayParams) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const RAZORPAY_KEY = import.meta.env.VITE_PUBLIC_RAZORPAY_ID;
  console.log("orderData", RAZORPAY_KEY);

  setLoading(true);

  try {
    const firstProduct = orderData.orderItems[0];

    const { data } = await axios.post(
      `${BASE_URL}/api/v1/order/razorpayorder`,
      {
        productid: firstProduct.product,
        address: orderData.address,
        quantity: firstProduct.quantity,
        deliveryCharges: orderData.deliveryCharges,
      },
      {
        headers: { Authorization: authHeader }
      }
    );

    const { id, amount } = data.razorpayOrder;

    const options = {
      key: RAZORPAY_KEY,
      amount,
      currency: "INR",
      order_id: id,
      name: products[0]?.name || "Product",
      description: "Payment for product",
      handler: async (response: RazorpayResponse) => {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;

        try {
          const verification = await axios.post(
            `${BASE_URL}/api/v1/order/paymentverify`,
            { razorpay_order_id, razorpay_payment_id, razorpay_signature },
            {
              headers: { Authorization: authHeader }
            }
          );

          if (verification.data.success) {
            console.log("Payment verified");
      
          } else {
            console.error("Payment verification failed");
          }
        } catch (err) {
          console.error("Error during verification:", err);
        }
      },
      prefill: {
        name: currentUser?.username,
        email: currentUser?.email,
        contact: currentUser?.contact
      },
      theme: {
        color: "#5239E9"
      }
    };

    // Use the imported Razorpay directly
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
  } finally {
    setLoading(false);
  }
};
