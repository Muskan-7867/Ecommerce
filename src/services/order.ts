import axios from "axios";
import { OrderData } from "../types/Product";
import Cookies from "js-cookie";
const baseurl = import.meta.env.VITE_BASE_URL;

async function placeOrder(orderData: OrderData) {
  let response;
  try {
    response = await axios.post(`${baseurl}/api/v1/order/create`, orderData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("authtoken")}`
      }
    });
  } catch {
    console.log("something went wrong");
  }
  return response;
}

export default placeOrder;
