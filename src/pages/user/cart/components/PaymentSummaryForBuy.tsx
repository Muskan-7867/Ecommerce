import {  useEffect, useState } from "react";
import PaymentSummary from "./PaymentSummary";
import { Product } from "../../../../types/Product";
import SummaryDetails from "./SummaryDetails";
import { PaymentType } from "./CartSummary";
import useCurrentUserStore from "../../../../store/User/user.store";
import { CurrentUser, AddressFormData } from "../../../../types/auth";
import { usePaymentHandlerForBuy } from "../../../../hooks/usePaymentHandlerForBuy";

interface CartSummaryProps {
  products: Product[];
  quantities: { [id: string]: number };
}

const PaymentSummaryForBuy: React.FC<CartSummaryProps> = ({
  products,
  quantities
}) => {
  const { isLoggined } = useCurrentUserStore();
  const { currentUserFromStore } = useCurrentUserStore() as {
    currentUserFromStore: CurrentUser;
  };

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentType>("online_payment");

  const { loading, loginMsg, handleOrder, popup } = usePaymentHandlerForBuy();
 
   useEffect(() => {
  }, [isLoggined, currentUserFromStore]);

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

  // Get address with proper type checking
  const getAddress = (): AddressFormData => {
    const address = currentUserFromStore?.address;
    if (!address || typeof address !== "object") {
      // Return a default address object when none exists
      return {
        phone: "",
        street: "",
        city: "",
        state: "",
        country: "",
        pincode: ""
      };
    }
    return address;
  };

  const orderData = {
    quantity: totalQuantity,
    totalQuantity,
    totalPrice: total,
    address: getAddress(), // Now guaranteed to return AddressFormData
    orderItems,
    status: "pending",
    deliveryCharges: deliveryCharge,
    payment: paymentMethod,
    isPaid: paymentMethod === "online_payment",
    paymentMethod: paymentMethod
  };

  return (
    <div className="w-full mx-auto relative">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 font-serif text-primary">
        Cart Summary
      </h1>

      {loginMsg && (
        <div className="mb-4 p-4 bg-yellow-100 text-yellow-700 rounded">
          Please log in to place your order. Redirecting...
        </div>
      )}

      {popup.show && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xl bg-opacity-50`}
        >
          <div
            className={`p-6 rounded-lg shadow-xl max-w-md w-full mx-4 ${
              popup.type === "success"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <div className="flex items-center">
              {popup.type === "success" ? (
                <svg
                  className="w-6 h-6 text-green-500 mr-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-red-500 mr-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              <h3
                className={`text-lg font-medium ${
                  popup.type === "success" ? "text-green-800" : "text-red-800"
                }`}
              >
                {popup.message}
              </h3>
            </div>
          </div>
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
        onClick={() =>
          handleOrder(
            orderData,
            products,
            quantities,
            paymentMethod,
            isLoggined,
            currentUserFromStore
          )
        }
        className="bg-primary text-white py-2 px-4 rounded-full mt-6 w-full hover:bg-primary-dark transition-colors disabled:opacity-50"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : isLoggined ? (
          "Place Order"
        ) : (
          "Please Login to Place Order"
        )}
      </button>
    </div>
  );
};

export default PaymentSummaryForBuy;
