import PaymentSummary from "./PaymentSummary";
import { Product } from "../../../../types/Product";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useCurrentUserStore from "../../../../store/User/user.store";
import {  CurrentUser } from "../../../../types/auth";
import PopupMessage from "../../../../components/common/OrderConfirmPopUp";
import SummaryDetails from "./SummaryDetails";

interface CartSummaryProps {
  products: Product[];
  quantities: { [id: string]: number };
}
const CartSummary: React.FC<CartSummaryProps> = ({ products, quantities }) => {
  const { isLoggined } = useCurrentUserStore();
  const { currentUserFromStore } = useCurrentUserStore() as { currentUserFromStore: CurrentUser};
  const navigate = useNavigate();
  const [loginMsg, setLoginMsg] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showConfirmPopUp, setShowConfirmPopUp] = useState(false);
  const subtotal = products.reduce((acc, product) => {
    const qty = quantities[product._id] || 1;
    return acc + product.price * qty;
  }, 0);

  const deliveryCharge = subtotal > 2000 ? 0 : 100;
  const total = subtotal + deliveryCharge;

  const totalQuantity = Object.values(quantities).reduce(
    (acc, qty) => acc + qty, 0
  );

  const handleOrder = () => {
    if (!isLoggined) {
      setLoginMsg(true);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }
    
   if (!currentUserFromStore.address) {
      navigate("/addressform");
    } else {
      setShowConfirmPopUp(true);
    }
  };

const orderItems = products.map((product) => ({
  product: product._id, // ✅ explicitly set the product ID
  price: product.price,
  quantity: quantities[product._id] || 1
}));


const orderData = {
  quantity: totalQuantity,
  totalQuantity,
  totalPrice: total,
  address: currentUserFromStore?.address,
  orderItems // ✅ now correctly formatted
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

     <SummaryDetails subtotal={subtotal} total={total} deliveryCharge={deliveryCharge}/>
      <PaymentSummary
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />

      {isLoggined ? (
        <button
          onClick={handleOrder}
          className="bg-primary text-white py-2 px-4 rounded-full mt-6 w-full"
        >
          Place Order
        </button>
      ) : (
        <button
          onClick={handleOrder}
          className="bg-primary text-white py-2 px-4 rounded-full mt-6 w-full"
        >
          Please Login to Place Order
        </button>
      )}

      {showConfirmPopUp && (
        <PopupMessage
          currentUserFromStore={currentUserFromStore}
          setShowConfirmPopUp={setShowConfirmPopUp}
          orderData={orderData}
        />
      )}
    </div>
  );
};

export default CartSummary;
