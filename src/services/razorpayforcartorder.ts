import axios from "axios";
import { OrderData, Product } from "../types/Product";
import { CurrentUser } from "../types/auth";
import { RazorpayResponse } from "razorpay";

interface RazorpayParams {
  orderData: OrderData;
  products: Product[];
  currentUser: CurrentUser;
  paymentmethod: string;
  authHeader: string;
  navigate: (path: string) => void;
  setLoading: (val: boolean) => void;
  setShowSuccessPopup: (val: boolean) => void; 
}

export const initiateRazorpayPayment = async ({
  orderData,
  products,
  currentUser,
  authHeader,
  paymentmethod,
  setLoading,
  setShowSuccessPopup,
  navigate

}: RazorpayParams) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const RAZORPAY_KEY = import.meta.env.VITE_PUBLIC_RAZORPAY_ID;


  setLoading(true);

  try {
    // Prepare cart data for the API
    const cartProductIds = orderData.orderItems.map(item => item.product);
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
        headers: { Authorization: authHeader }
      }
    );

    const { id, amount } = data.razorpayOrder;
    const orderId = data.order._id; // Assuming the order ID is in data.order._id
     
    const options = {
      key: RAZORPAY_KEY,
      amount,
      currency: "INR",
      order_id: id,
      name: "Your Store Name", // You can customize this
      description: `Payment for ${products.length} items`, // More descriptive
      handler: async (response: RazorpayResponse) => {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
          
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
              headers: { Authorization: authHeader }
            }
          );

          if (verification.data.success) {
             setShowSuccessPopup(true); 
              setTimeout(() => {
                navigate("/products")
              }, 2000)
          
            
          } else {
            console.error("Payment verification failed");
            // Handle failed verification
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
      notes: {
        orderId: orderId, // Add order ID to notes for reference
        userId: currentUser?._id
      },
      theme: {
        color: "#5239E9"
      }
    };

    const razorpay = new window.Razorpay(options);
    
    razorpay.open();
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    // Handle error appropriately
  } finally {
    setLoading(false);
  }
};