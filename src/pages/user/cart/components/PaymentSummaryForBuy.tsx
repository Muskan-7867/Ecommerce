import { useState } from "react";
import PaymentSummary from "./PaymentSummary";
import { Product } from "../../../../types/Product";
import SummaryDetails from "./SummaryDetails";
import { PaymentType } from "./CartSummary";
import useCurrentUserStore from "../../../../store/User/user.store";
import { CurrentUser } from "../../../../types/auth";
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
  
  const { loading, loginMsg, handleOrder } = usePaymentHandlerForBuy();

  // Calculate order summary
  const subtotal = products.reduce((acc, product) => {
    const qty = quantities[product._id] || 1;
    return acc + product.price * qty;
  }, 0);

  const deliveryCharge = products.reduce((acc, product) => {
    const charge = Number(product?.deliveryCharges || 0);
    return acc + (isNaN(charge) ? 0 : charge)
  }, 0);

  const total = subtotal + deliveryCharge;
  const totalQuantity = Object.values(quantities).reduce(
    (acc, qty) => acc + qty,
    0
  );

  // Prepare order data
  const orderItems = products.map((product) => ({
    product: product._id,
    price: product.price,
    quantity: quantities[product._id] || 1
  }));
  
  const orderData = {
    quantity: totalQuantity,
    totalQuantity,
    totalPrice: total,
    address: currentUserFromStore?.address, 
    orderItems,
    status: "pending",
    deliveryCharges: deliveryCharge,
    payment: paymentMethod,
    isPaid: paymentMethod === "online_payment" ? false : true,
    paymentMethod: paymentMethod
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
        onClick={() => handleOrder(
          orderData,
          products,
          quantities,
          paymentMethod,
          isLoggined,
          currentUserFromStore
        )}
        className="bg-primary text-white py-2 px-4 rounded-full mt-6 w-full hover:bg-primary-dark transition-colors disabled:opacity-50"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : "Place Order"}
      </button>
    </div>
  );
};

export default PaymentSummaryForBuy;