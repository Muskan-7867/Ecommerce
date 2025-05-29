const ProductDetailShimmer = () => {
  return (
    <div className="min-h-screen w-full py-12 px-4 mt-28">
      <div className="max-w-6xl mx-auto bg-white rounded-xl overflow-hidden animate-pulse">
        <div className="md:flex gap-8">
          {/* Image Placeholder */}
          <div className="w-full md:w-1/2 p-4">
            <div className="aspect-square bg-gray-200 rounded-lg w-full"></div>
          </div>

          {/* Details Placeholder */}
          <div className="w-full md:w-1/2 p-4 space-y-6">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mt-4"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>

            {/* Features */}
            <div className="mt-6">
              <div className="h-5 w-1/3 bg-gray-100 rounded mb-2"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>

            {/* Price and Buttons */}
            <div className="flex gap-4 mt-6">
              <div className="h-10 w-32 bg-gray-200 rounded"></div>
              <div className="h-10 w-32 bg-gray-200 rounded"></div>
            </div>

            <div className="h-4 w-1/2 bg-gray-100 mt-4 rounded"></div>
          </div>
        </div>
      </div>

      {/* Related Products Shimmer */}
      <div className="max-w-full mx-auto mt-16 p-4">
        <div className="h-6 bg-gray-300 w-1/3 mb-4 rounded"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm animate-pulse"
            >
              <div className="h-40 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 w-3/4 mb-2 rounded"></div>
              <div className="h-3 bg-gray-200 w-full mb-2 rounded"></div>
              <div className="h-3 bg-gray-200 w-2/3 mb-4 rounded"></div>
              <div className="h-8 bg-gray-300 w-1/2 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailShimmer;
