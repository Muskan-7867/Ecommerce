import { LiaRupeeSignSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { useSingleProduct } from "../../../../store/product/Product.store";

interface SingleProductPageProps {
  quantities: { [id: string]: number };
  setQuantities: React.Dispatch<React.SetStateAction<{ [id: string]: number }>>;
}

const SingleProductPage: React.FC<SingleProductPageProps> = ({ quantities, setQuantities }) => {
  const { singleProduct } = useSingleProduct();
  const navigate = useNavigate();

  if (!singleProduct) {
    return <div className="p-6 text-gray-500">Product not loaded.</div>;
  }

  const quantity = quantities[singleProduct._id] || 1;

  const handleChangeQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setQuantities((prev) => ({
      ...prev,
      [id]: quantity
    }));
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-lg w-full">
      {/* Left: Image + Name + Qty */}
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 flex-wrap w-full sm:w-auto">
        {/* Image */}
        <div className="w-20 h-20 flex-shrink-0">
          <img
            onClick={() => navigate(`/products/${singleProduct._id}`)}
            src={singleProduct.images[0]?.url}
            alt={singleProduct.name}
            className="w-full h-full object-cover rounded-md cursor-pointer"
          />
        </div>

        {/* Name + Qty */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">{singleProduct.name}</h3>
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <p className="text-sm font-medium">Qty</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleChangeQuantity(singleProduct._id, quantity + 1)}
                className="p-2 border border-gray-200 w-10 sm:w-12 rounded-sm"
              >
                +
              </button>
              <p className="flex items-center justify-center w-6">{quantity}</p>
              <button
                onClick={() => handleChangeQuantity(singleProduct._id, quantity - 1)}
                className="p-2 border border-gray-200 w-10 sm:w-12 rounded-sm"
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Price */}
      <div className="text-gray-700 text-sm sm:text-base font-medium flex items-center">
        <LiaRupeeSignSolid className="mr-1" />
        {singleProduct.price.toFixed(2)}
      </div>
    </div>
  );
};

export default SingleProductPage;
