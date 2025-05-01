import { useState } from "react";
import { Product} from "../../../../types/Product";

interface ProductZoomEffectProps {
  product: Product;
  onHover: (isHovered: boolean, position: { x: number; y: number }) => void;
  ProductImage: string;
  selectedImg: number;
  
}

const ProductZoomEffect = ({ product, onHover }: ProductZoomEffectProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMousePosition({ x, y });
    onHover(true, { x, y });
  };

  return (
    <div className="w-full h-[30rem] relative overflow-hidden">
      {product ? (
        <div
          className="w-full h-full flex items-center justify-center"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => onHover(true, mousePosition)}
          onMouseLeave={() => onHover(false, mousePosition)}
        >
          <img
            src={product.images[0].url}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <span>No image available</span>
        </div>
      )}
    </div>
  );
};

export default ProductZoomEffect;
