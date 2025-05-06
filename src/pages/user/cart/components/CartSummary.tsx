
import PaymentSummary from "./PaymentSummary";
import { LiaRupeeSignSolid } from "react-icons/lia";

import { Product } from "../../../../types/Product";

interface CartSummaryProps {
    products: Product[];
    quantities: { [id: string]: number };
  }
  
  const CartSummary: React.FC<CartSummaryProps> = ({ products, quantities }) => {
    const subtotal = products.reduce((acc, product) => {
      const qty = quantities[product._id] || 1;
      return acc + product.price * qty;
    }, 0);
  
    const deliveryCharge = subtotal > 2000 ? 0 : 100;
    const total = subtotal + deliveryCharge;
  
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4 font-serif text-primary ">
          Cart Summary
        </h1>
        <div className="flex flex-col border border-gray-200 rounded-lg">
          <div className="flex flex-col rounded-md p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-md font-normal mb-4 font-serif">Subtotal:</h1>
              <div className="flex items-center">
                <LiaRupeeSignSolid />
                <h1 className="text-sm">{subtotal}/-</h1>
              </div>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 ">
              <h1 className="text-md font-normal mb-4 font-serif">Delivery:</h1>
              <div className="flex items-center">
                <LiaRupeeSignSolid />
                <h1 className="text-sm">{deliveryCharge}/-</h1>
              </div>
            </div>
          </div>
          <div className="flex justify-between px-4">
            <h1 className="text-md font-normal mb-4 font-serif ">Total:</h1>
            <div className="flex items-center">
              <LiaRupeeSignSolid />
              <h1 className="text-sm">{total}/-</h1>
            </div>
          </div>
        </div>
  
        <PaymentSummary />
  
        <button className="bg-primary text-white py-2 px-4 rounded-full mt-8 w-full">
          Place Order
        </button>
      </div>
    );
  };
  
  export default CartSummary;
  