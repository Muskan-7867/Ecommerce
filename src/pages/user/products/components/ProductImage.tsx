import { useRef, useState } from "react";
import { Product } from "../../../../types/Product";

const ProductImage = ({ product }: { product: Product }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const images = product?.images || [];
  const mainImage = selectedImage || images[0]?.url;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const { left, top, width, height } = container.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  return (
    <div className="w-full md:w-1/2 p-4 md:p-6 space-y-4">
      {/* Main Image */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        // layoutId={product?.images[0]?.publicId}
        className="relative w-full aspect-square max-h-[400px] overflow-hidden rounded-lg"
      >
        <img
          src={mainImage}
          className="w-full h-full object-cover rounded-lg"
          alt={product?.name || "Product main image"}
        />

        {isHovering && (
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="w-full h-full bg-no-repeat"
              style={{
                backgroundImage: `url(${mainImage})`,
                backgroundSize: "200%",
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                transform: "sacle(1.5)"
              }}
            />
          </div>
        )}

        {isHovering && (
          <div
            className="absolute pointer-events-none bg-blue-200/40  overflow-hidden"
            style={{
              width: "200px",
              height: "160px",
              left: `${zoomPosition.x}%`,
              top: `${zoomPosition.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: 10,
              backgroundImage: `
                   linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
                   linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
    `,
              backgroundSize: "2px 2px"
            }}
          />
        )}
      </div>
      {/* Thumbnails */}
      <div className="w-full flex justify-center">
        <div
          // layoutId={product.images[0].publicId}
          className="flex gap-2 md:gap-4 overflow-x-auto pb-2 scrollbar-hide"
        >
          {images.length > 0 ? (
            images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                onClick={() => setSelectedImage(image.url)}
                alt={`Thumbnail ${index + 1}`}
                className={`w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-md object-cover cursor-pointer transition border-2 ${
                  (selectedImage || images[0].url) === image.url
                    ? "border-primary"
                    : "border-transparent"
                }`}
              />
            ))
          ) : (
            <div className="text-sm text-gray-500">
              No additional images available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
