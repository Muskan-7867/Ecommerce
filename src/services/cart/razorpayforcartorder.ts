import axios from "axios";
import { OrderData, Product } from "../../types/Product";
import { CurrentUser } from "../../types/auth";
import { RazorpayResponse } from "razorpay";

interface RazorpayParams {
  orderData: OrderData;
  products: Product[];
  currentUserFromStore: CurrentUser | null;
  paymentmethod: string;
  token: string;
  navigate: (path: string) => void;
  setLoading: (val: boolean) => void;
  setShowSuccessPopup: (val: boolean) => void;
  setError?: (error: string) => void;
}

export const initiateRazorpayPayment = async ({
  orderData,
  products,
  currentUserFromStore,
  token,
  paymentmethod,
  setLoading,
  setShowSuccessPopup,
  navigate,
  setError
}: RazorpayParams) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const RAZORPAY_KEY = import.meta.env.VITE_PUBLIC_RAZORPAY_ID;

  // Validate required environment variables
  if (!BASE_URL || !RAZORPAY_KEY) {
    const errorMsg = "Missing required environment variables";
    console.error(errorMsg);
    setError?.(errorMsg);
    return;
  }

  // Validate current user
  if (!currentUserFromStore) {
    const errorMsg = "User not authenticated";
    console.error(errorMsg);
    setError?.(errorMsg);
    navigate("/login");
    return;
  }

  setLoading(true);

  try {
    // Prepare cart data for the API
    const cartProductIds = orderData.orderItems.map((item) => item.product);
    const quantities = orderData.orderItems.reduce((acc, item) => {
      acc[item.product] = item.quantity;
      return acc;
    }, {} as Record<string, number>);

    const { data } = await axios.post(
      `${BASE_URL}/api/v1/order/cartrazorpayorder`,
      {
        cartProductIds,
        address: orderData.address,
        quantities,
        paymentMethod: paymentmethod
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (!data?.razorpayOrder?.id || !data?.order?._id) {
      throw new Error("Invalid response from server");
    }

    const { id, amount } = data.razorpayOrder;
    const orderId = data.order._id;

    const options = {
      key: RAZORPAY_KEY,
      amount,
      currency: "INR",
      order_id: id,
      name: "OMEG-BAZAAR",
      description: `Payment for ${products.length} item${
        products.length > 1 ? "s" : ""
      }`,
      handler: async (response: RazorpayResponse) => {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
        console.log("from frontend payment ", response);
        try {
          const verification = await axios.post(
            `${BASE_URL}/api/v1/order/paymentverify`,
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
              orderId,
              paymentMethod: paymentmethod
            },
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );

          if (verification?.data.success) {
            setShowSuccessPopup(true);
            setTimeout(() => {
              navigate("/products");
            }, 2000);
          } else {
            const errorMsg = verification.data.message;
            console.error(errorMsg);
            setError?.(errorMsg);
          }
        } catch (err) {
          const errorMsg = axios.isAxiosError(err)
            ? err.response?.data?.message || "Error during verification"
            : "Error during verification";
          console.error("Error during verification:", errorMsg);
          setError?.(errorMsg);
        }
      },
      prefill: {
        name: currentUserFromStore.username || "",
        email: currentUserFromStore.email || "",
        contact: currentUserFromStore.contact || ""
      },
      notes: {
        orderId: orderId,
        userId: currentUserFromStore._id
      },
      theme: {
        color: "#ca8888"
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    const errorMsg = axios.isAxiosError(error)
      ? error.response?.data?.message || "Error creating Razorpay order"
      : error instanceof Error
      ? error.message
      : "Error creating Razorpay order";

    console.error("Error creating Razorpay order:", errorMsg);
    setError?.(errorMsg);
  } finally {
    setLoading(false);
  }
};
