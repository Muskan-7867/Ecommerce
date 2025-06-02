import PaymentSummary from "./PaymentSummary";
import { Product } from "../../../../types/Product";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useCurrentUserStore from "../../../../store/User/user.store";
import { CurrentUser } from "../../../../types/auth";
import PopupMessage from "../../../../components/common/OrderConfirmPopUp";
import SummaryDetails from "./SummaryDetails";
import useOrderHandler from "../../../../hooks/useOrderHandler";
import { AddressFormData } from "../../../../types/auth"; 

export type PaymentType = "online_payment" | "cash_on_delivery";

interface CartSummaryProps {
  products: Product[];
  quantities: { [id: string]: number };
}

const CartSummary: React.FC<CartSummaryProps> = ({ products, quantities }) => {
  const { isLoggined } = useCurrentUserStore();
  const { currentUserFromStore } = useCurrentUserStore() as {
    currentUserFromStore: CurrentUser;
  };

  const navigate = useNavigate();
  const [loginMsg, setLoginMsg] = useState(false);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentType>("online_payment");
  const [showConfirmPopUp, setShowConfirmPopUp] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
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

  // Fix: Ensure address is either AddressFormData or undefined
  const address = typeof currentUserFromStore?.address === 'object' 
    ? currentUserFromStore.address as AddressFormData 
    : undefined;

  const orderData = {
    quantity: totalQuantity,
    totalQuantity,
    totalPrice: total,
    address,
    orderItems,
    status: "pending",
    deliveryCharges: deliveryCharge,
    payment: paymentMethod,
    isPaid: paymentMethod === "online_payment"
  };

  const { handlePlaceOrder } = useOrderHandler({
    orderData,
    products,
    paymentmethod: paymentMethod,
    setLoading,
    setShowConfirmPopUp,
    setShowSuccessPopup
  });

  const handleOrder = () => {
    if (!isLoggined) {
      setLoginMsg(true);
      sessionStorage.setItem('prevPath', window.location.pathname);
    sessionStorage.setItem('pendingOrder', JSON.stringify({
      orderData,
      products,
      quantities,
      paymentMethod
    }));
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    
      return;
    }

    if (!address) { // Now properly checking for address
      navigate("/addressform");
      return;
    }

    if (paymentMethod === "cash_on_delivery") {
      handlePlaceOrder();
    } else {
      setShowConfirmPopUp(true);
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
        setPaymentMethod={(method) => setPaymentMethod(method as PaymentType)}
      />

      {showSuccessPopup && (
        <div className="fixed inset-0 backdrop-blur-2xl bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm">
            <h3 className="text-lg font-bold text-green-600 mb-2">
              {paymentMethod === "cash_on_delivery" 
                ? "Order Confirmed!" 
                : "Payment Successful!"}
            </h3>
            <p>
              {paymentMethod === "cash_on_delivery"
                ? "Your order has been placed successfully!"
                : "Your payment was verified and order has been placed."}
            </p>
            <p className="mt-2">Redirecting to products page...</p>
          </div>
        </div>
      )}

      <button
        onClick={handleOrder}
        className="bg-primary text-white py-2 px-4 rounded-full mt-6 w-full"
        disabled={loading}
      >
        {loading
          ? "Processing..."
          : isLoggined
          ? "Place Order"
          : "Please Login to Place Order"}
      </button>

      {showConfirmPopUp && (
        <PopupMessage
          currentUserFromStore={currentUserFromStore}
          setShowConfirmPopUp={setShowConfirmPopUp}
          orderData={orderData}
          products={products}
          paymentmethod={paymentMethod}
          setShowSuccessPopup={setShowSuccessPopup}
        />
      )}
    </div>
  );
};

export default CartSummary;