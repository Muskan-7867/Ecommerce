const ProductCardShimmer = () => {
  return (
    <div className="bg-white p-3 rounded-md flex flex-col w-[15rem] shadow-sm animate-pulse mx-4">
      <div className="aspect-square w-full flex items-center justify-center h-[140px] bg-gray-200 rounded">
        {/* Image Placeholder */}
        <div className="w-[14rem] h-[10rem] bg-gray-100 rounded"></div>
      </div>

      <div className="mt-12 flex-grow space-y-2">
        {/* Title */}
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        {/* Description */}
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>

      <div className="flex justify-between items-center mt-2">
        {/* Price */}
        <div className="h-4 w-12 bg-gray-300 rounded"></div>
        {/* Button */}
        <div className="h-8 w-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default ProductCardShimmer;
