// services/order.ts
import axios from "axios";
import { OrderData } from "../types/Product";
const baseurl = import.meta.env.VITE_BASE_URL;

async function placeOrder(orderData: OrderData, token: string) {
  try {
    const response = await axios.post(`${baseurl}/api/v1/order/create`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
}

export default placeOrder;