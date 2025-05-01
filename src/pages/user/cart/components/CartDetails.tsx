import { FaTrash } from "react-icons/fa";
import { Product } from "../../../../types/Product";
import { useState } from "react";

interface CartDetailsProps {
  product: Product;
  onDelete: (id: string) => void;
}

const CartDetails = ({ product, onDelete }: CartDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4   bg-white">
      {/* Product Image */}
      <div className="flex justify-center items-center sm:w-[80px]">
        <img
          src={product.images[0]?.url}
          alt={product.name}
          className="w-20 h-20 object-cover rounded-md"
        />
      </div>

      {/* Info */}
      <div className="flex-1 sm:px-4 space-y-1">
        <h3 className="text-lg sm:text-xl font-semibold">{product.name}</h3>
        <p className="text-gray-700 text-sm sm:text-base font-medium">
          ${product.price.toFixed(2)}
        </p>
      </div>

      {/* Quantity */}
      <div className="flex flex-col items-start sm:items-center gap-1">
        <p className="text-sm font-medium">Qty</p>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-16 border border-gray-300 text-center rounded-md py-1 px-2 text-sm"
        />
      </div>

      {/* Delete */}
      <button
        onClick={() => onDelete(product._id)}
        className="self-end sm:self-center mt-2 lg:mt-24 sm:mt-0 text-red-500 hover:text-red-700 transition"
        title="Remove item"
      >
        <FaTrash className="text-lg" />
      </button>
    </div>
  );
};

export default CartDetails;
