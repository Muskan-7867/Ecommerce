import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types/Product";
import { CurrentUser } from "../../types/auth";
import { AddressFormData } from "../../types/auth";
import { PaymentType } from "../../pages/user/cart/components/CartSummary";
import { useCODHandler } from "./useCodHandler";
import { useOnlinePaymentHandler } from "./useOnlineHandler";

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
  const [loginMsg, setLoginMsg] = useState(false);
  const navigate = useNavigate();

  const {
    loading: codLoading,
    handleCODOrder,
    popup: codPopup
  } = useCODHandler();

  const {
    loading: onlineLoading,
    handleOnlinePayment,
    popup: onlinePopup
  } = useOnlinePaymentHandler();

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

      const currentPath = window.location.pathname;

      // ✅ Set previous path and login source
      sessionStorage.setItem("prevPath", currentPath);
      sessionStorage.setItem("loginFrom", "checkout");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
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
      await handleCODOrder(orderWithTypedAddress);
    } else {
      await handleOnlinePayment(
        products,
        quantities,
        paymentMethod,
        currentUserFromStore
      );
    }
  };

  return {
    loading: codLoading || onlineLoading,
    loginMsg,
    setLoginMsg,
    handleOrder,
    popup: codPopup.show ? codPopup : onlinePopup
  };
};
