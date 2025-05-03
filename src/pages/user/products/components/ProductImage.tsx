import { useState } from "react";
import { Product } from "../../../../types/Product";
import { motion } from "motion/react";


const ProductImage = ({ product }: { product: Product }) => {
  const [selectedImage, setSelectedImage] = useState("");

  const images = product?.images || [];
  const mainImage = selectedImage || images[0]?.url;

  return (
    <div className="w-full md:w-1/2 p-4 md:p-6 space-y-4">
      {/* Main Image */}
      <motion.div 
      layoutId={product.images[0].publicId}
      className="w-full aspect-square max-h-[400px]">
        <img
          src={mainImage}
          className="w-full h-full object-cover rounded-lg"
          alt={product?.name || "Product main image"}
        />
      </motion.div>

      {/* Thumbnails */}
      <div className="w-full flex justify-center">
        <motion.div
        // layoutId={product.images[0].publicId}
        
        className="flex gap-2 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {images.length > 0 ? (
            images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                onClick={() => setSelectedImage(image.url)}
                alt={`Thumbnail ${index + 1}`}
                className={`w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-md object-cover cursor-pointer transition border-2 ${
                  selectedImage === image.url
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
        </motion.div>
      </div>
    </div>
  );
};

export default ProductImage;
